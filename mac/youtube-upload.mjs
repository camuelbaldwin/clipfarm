import { randomBytes, createHash } from "node:crypto";
import { createWriteStream, createReadStream } from "node:fs";
import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

let connection=null, pending=null, inProgress=false;
const endpoint="http://127.0.0.1:43129/api/youtube/callback";
const json=(res,code,body)=>{res.writeHead(code,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});res.end(JSON.stringify(body))};
const err=e=>String(e?.message||e).slice(0,650);
const textBody=async req=>{let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>25000)throw Error("Request too large");chunks.push(chunk)}return JSON.parse(Buffer.concat(chunks).toString("utf8"))};
const remoteError=async r=>{let body=await r.text();try{return JSON.parse(body).error?.message||body.slice(0,360)}catch{return body.slice(0,360)}};
const verifier=()=>randomBytes(32).toString("base64url");
const digest=s=>createHash("sha256").update(s).digest("base64url");
const endpointCheck=(value)=>{const u=new URL(value);if(u.protocol!=="https:")throw Error("Revid did not provide a secure HTTPS video URL.");const host=u.hostname.toLowerCase();if(host==="localhost"||host.endsWith(".localhost")||host.endsWith(".local")||host.endsWith(".internal")||host==="metadata.google.internal"||/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)||host.includes(":"))throw Error("Unsafe video host");return u.href};
async function refreshToken(){
 if(!connection)throw Error("Connect YouTube first.");
 if(Date.now()<connection.expireAt-60000)return connection.accessToken;
 const params=new URLSearchParams({client_id:connection.clientId,client_secret:connection.clientSecret||"",refresh_token:connection.refreshToken,grant_type:"refresh_token"});
 const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:params});
 if(!r.ok)throw Error("YouTube connection expired: "+await remoteError(r)+". Connect again.");
 const v=await r.json();connection.accessToken=v.access_token;connection.expireAt=Date.now()+(Number(v.expires_in)||3500)*1000;
 return connection.accessToken;
}
async function verifyRevidVideo(pid,key){
 if(!/^[\w-]{3,150}$/.test(pid)||!key)throw Error("Revid project ID and API key required.");
 const r=await fetch("https://www.revid.ai/api/public/v3/status?pid="+encodeURIComponent(pid),{headers:{key,"user-agent":"ClipFarmStudio/1.0"}});
 if(!r.ok)throw Error("Revid project verification failed: "+await remoteError(r));
 const payload=await r.json(),v=payload.data||payload;
 const state=String(v.status||v.state||"").toLowerCase();
 if(["failed","error","rendering","queued","processing","pending"].includes(state))throw Error("Video has not finished rendering in Revid.");
 const url=endpointCheck(v.videoUrl||v.video_url||v.url||"");
 return url;
}
async function uploadUnlisted(input){
 const pid=String(input.pid||""),key=String(input.revidKey||"");
 const title=String(input.title||"").trim(),description=String(input.description||"").trim(),tags=Array.isArray(input.tags)?input.tags.map(String).map(x=>x.trim()).filter(Boolean):[];
 if(!title||title.length>100||!description||description.length>5000)throw Error("YouTube title and description required; title max 100 characters.");
 if(tags.join(",").length>500)throw Error("Keyword tags exceed YouTube's 500-character limit.");
 if(input.visibility!=="unlisted")throw Error("Only Unlisted YouTube uploads are permitted.");
 const videoUrl=await verifyRevidVideo(pid,key);
 const token=await refreshToken();
 const folder=await mkdtemp(join(tmpdir(),"clipfarm-revid-"));const path=join(folder,"video.mp4");
 try{
  const source=await fetch(videoUrl,{redirect:"follow"});
  if(!source.ok||!source.body)throw Error("Could not fetch finished Revid video: HTTP "+source.status);
  const mime=source.headers.get("content-type")||"video/mp4";
  if(!mime.startsWith("video/")&&!mime.startsWith("application/octet-stream")&&!mime.startsWith("application/mp4"))throw Error("Revid URL did not return a video file.");
  if(Number(source.headers.get("content-length"))>1024*1024*1024)throw Error("Video exceeds 1 GB desktop upload limit.");
  let received=0;
  const {Transform}=await import("node:stream");
  const limited=new Transform({transform(chunk,enc,cb){received+=chunk.length;if(received>1024*1024*1024)cb(Error("Video exceeds 1 GB desktop upload limit."));else cb(null,chunk)}});
  await pipeline(Readable.fromWeb(source.body),limited,createWriteStream(path));
  const fileSize=(await stat(path)).size;if(!fileSize)throw Error("Revid returned an empty video.");
  const metadata={snippet:{title,description,tags,categoryId:"22"},status:{privacyStatus:"unlisted"}};
  const session=await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",{
   method:"POST",headers:{authorization:"Bearer "+token,"content-type":"application/json; charset=UTF-8","x-upload-content-length":String(fileSize),"x-upload-content-type":"video/mp4"},body:JSON.stringify(metadata)
  });
  if(!session.ok)throw Error("YouTube rejected upload setup: "+await remoteError(session));
  const uploadUrl=session.headers.get("location");if(!uploadUrl||!uploadUrl.startsWith("https://www.googleapis.com/"))throw Error("YouTube did not return a valid upload session.");
  const result=await fetch(uploadUrl,{method:"PUT",headers:{authorization:"Bearer "+token,"content-type":"video/mp4","content-length":String(fileSize)},body:createReadStream(path),duplex:"half"});
  if(!result.ok)throw Error("YouTube upload not confirmed. Inspect YouTube Studio before retrying to avoid duplicates. "+await remoteError(result));
  const video=await result.json();
  if(!/^[A-Za-z0-9_-]{11}$/.test(video.id||""))throw Error("YouTube did not return a valid video ID; check Studio before retrying.");
  const verify=await fetch("https://www.googleapis.com/youtube/v3/videos?part=status&id="+encodeURIComponent(video.id),{headers:{authorization:"Bearer "+token}});
  if(!verify.ok)return {youtubeId:video.id,youtubeUrl:"https://www.youtube.com/watch?v="+video.id,visibility:video.status?.privacyStatus||"unknown",warning:"Upload finished but YouTube visibility could not be verified: "+await remoteError(verify)};
  const check=await verify.json(),actual=check.items?.[0]?.status?.privacyStatus||video.status?.privacyStatus||"unknown";
  return {youtubeId:video.id,youtubeUrl:"https://www.youtube.com/watch?v="+video.id,visibility:actual,title:video.snippet?.title||title};
 }finally{await rm(folder,{recursive:true,force:true})}
}
export async function handleYouTube(req,res,url){
 if(!url.pathname.startsWith("/api/youtube/"))return false;
 if(url.pathname==="/api/youtube/callback"&&req.method==="GET"){
  const state=url.searchParams.get("state"),code=url.searchParams.get("code"),failure=url.searchParams.get("error");
  const p=pending;
  if(!p||!state||p.state!==state||p.expires<Date.now()){res.writeHead(400,{"content-type":"text/plain"});res.end("Authorization session invalid or expired. Return to Clip Farm and connect again.");return true}
  pending=null;
  try{
   if(failure||!code)throw Error(failure||"Authorization was cancelled.");
   const form=new URLSearchParams({code,client_id:p.clientId,client_secret:p.clientSecret||"",code_verifier:p.verifier,redirect_uri:endpoint,grant_type:"authorization_code"});
   const t=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:form});
   if(!t.ok)throw Error(await remoteError(t));
   const tokens=await t.json();
   if(!tokens.refresh_token)throw Error("Google did not return an offline refresh token. Reconnect and approve access.");
   connection={clientId:p.clientId,clientSecret:p.clientSecret,refreshToken:tokens.refresh_token,accessToken:tokens.access_token,expireAt:Date.now()+(tokens.expires_in||3500)*1000};
   const channelRes=await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",{headers:{authorization:"Bearer "+connection.accessToken}});
   if(!channelRes.ok){connection=null;throw Error("Could not identify your connected YouTube channel: "+await remoteError(channelRes))}
   const channelData=await channelRes.json(),channel=channelData.items?.[0];
   if(!channel?.id){connection=null;throw Error("No YouTube channel is associated with the Google account selected.")}
   connection.channelId=channel.id;connection.channelTitle=channel.snippet?.title||channel.id;
   res.writeHead(200,{"content-type":"text/html; charset=utf-8"});res.end("<!doctype html><title>Clip Farm YouTube connected</title><h2>YouTube connected to Clip Farm.</h2><p>Return to Clip Farm Studio. You may close this tab.</p>");
  }catch(e){res.writeHead(400,{"content-type":"text/plain; charset=utf-8"});res.end("YouTube connection failed: "+err(e))}
  return true;
 }
 const origin=req.headers.origin||"";
 if(origin!=="http://127.0.0.1:43129"){json(res,403,{error:"This operation is only allowed from the local Clip Farm Mac app."});return true}
 try{
  if(url.pathname==="/api/youtube/status"&&req.method==="POST"){json(res,200,{connected:!!connection,channelId:connection?.channelId||"",channelTitle:connection?.channelTitle||"",uploading:inProgress,mode:"desktop-unlisted"});return true}
  if(url.pathname==="/api/youtube/disconnect"&&req.method==="POST"){if(inProgress)throw Error("Wait until upload completes.");connection=null;json(res,200,{connected:false});return true}
  if(url.pathname==="/api/youtube/connect"&&req.method==="POST"){
   const input=await textBody(req),clientId=String(input.clientId||""),clientSecret=String(input.clientSecret||"");
   if(!clientId.endsWith(".apps.googleusercontent.com"))throw Error("Enter your Google OAuth Desktop client ID.");
   const state=verifier(),secret=verifier();
   pending={clientId,clientSecret,state,verifier:secret,expires:Date.now()+10*60*1000};
   const p=new URLSearchParams({client_id:clientId,redirect_uri:endpoint,response_type:"code",scope:"https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",access_type:"offline",prompt:"consent",state,code_challenge:digest(secret),code_challenge_method:"S256"});
   json(res,200,{authorizationUrl:"https://accounts.google.com/o/oauth2/v2/auth?"+p.toString()});return true;
  }
  if(url.pathname==="/api/youtube/upload-unlisted"&&req.method==="POST"){
   if(inProgress)throw Error("A YouTube upload is already in progress. Finish it before starting another.");
   if(!connection)throw Error("Connect your YouTube account first.");
   const input=await textBody(req);inProgress=true;
   try{json(res,200,await uploadUnlisted(input))}finally{inProgress=false}
   return true;
  }
  json(res,404,{error:"YouTube API route not found"});return true;
 }catch(e){json(res,400,{error:err(e)});return true}
}
