import { app } from "electron";
import { readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { getPublishingAuth } from "./youtube-upload.mjs";

const file=()=>join(app.getPath("userData"),"youtube-publishing-history.json");
const validId=s=>/^[A-Za-z0-9_-]{11}$/.test(String(s||""));
const json=(res,code,body)=>{res.writeHead(code,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});res.end(JSON.stringify(body))};
const message=e=>String(e?.message||e).slice(0,480);
async function readHistory(){
 try{const obj=JSON.parse(await readFile(file(),"utf8"));return Array.isArray(obj.items)?obj.items:[]}catch(e){if(e.code==="ENOENT")return [];throw Error("Cannot read local publishing history: "+message(e))}
}
async function writeHistory(items){
 const tmp=file()+"."+randomBytes(6).toString("hex")+".tmp";
 await writeFile(tmp,JSON.stringify({schema:1,savedAt:new Date().toISOString(),items:items.slice(0,5000)}),{mode:0o600});
 await rename(tmp,file());
}
function statusOf(video){
 const s=video.status||{},at=s.publishAt;
 if(s.uploadStatus==="failed"||s.uploadStatus==="rejected")return "Failed";
 if(at&&s.privacyStatus==="private"&&Date.parse(at)>Date.now())return "Scheduled";
 if(s.privacyStatus==="public")return "Published";
 if(s.privacyStatus==="unlisted")return "Unlisted";
 return "Private";
}
async function yt(path,token,options){
 const r=await fetch("https://www.googleapis.com/youtube/v3/"+path,{...options,headers:{authorization:"Bearer "+token,...(options?.headers||{})}});
 if(!r.ok){let e="";try{e=(await r.json()).error?.message||""}catch{}throw Error("YouTube API ("+r.status+"): "+(e||r.statusText))}
 return r.json();
}
function record(video,channel){
 return {youtubeId:video.id,youtubeUrl:"https://www.youtube.com/watch?v="+video.id,channelId:channel.channelId,channelTitle:channel.channelTitle,
  title:video.snippet?.title||video.id,visibility:video.status?.privacyStatus||"unknown",
  publishAt:video.status?.publishAt||null,publishedAt:video.status?.privacyStatus==="public"?(video.snippet?.publishedAt||null):null,
  uploadedAt:video.snippet?.publishedAt||null,publicationStatus:statusOf(video),viewCount:Number(video.statistics?.viewCount||0),
  likeCount:Number(video.statistics?.likeCount||0),commentCount:Number(video.statistics?.commentCount||0),lastSyncedAt:new Date().toISOString()};
}
async function fetchVideo(id,auth){
 const r=await yt("videos?part=snippet,status,statistics&id="+encodeURIComponent(id),auth.token);
 const v=r.items?.[0];if(!v)throw Error("Video not found in the authorized account.");
 if(v.snippet?.channelId!==auth.channelId)throw Error("Video belongs to another YouTube channel. Switch the connected channel.");
 return v;
}
function merge(current,newRecords){
 const byId=new Map(current.map(x=>[x.youtubeId,x]));
 for(const rec of newRecords)byId.set(rec.youtubeId,{...(byId.get(rec.youtubeId)||{}),...rec});
 return [...byId.values()].sort((a,b)=>String(b.uploadedAt||b.lastSyncedAt||"").localeCompare(String(a.uploadedAt||a.lastSyncedAt||"")));
}
async function syncChannel(){
 const auth=await getPublishingAuth();
 const channelData=await yt("channels?part=contentDetails&mine=true",auth.token);
 const uploads=channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
 if(!uploads)throw Error("Could not find this channel's uploaded-videos playlist.");
 let ids=[],next="",pages=0;
 do{
  const p=await yt("playlistItems?part=contentDetails&maxResults=50&playlistId="+encodeURIComponent(uploads)+(next?"&pageToken="+encodeURIComponent(next):""),auth.token);
  ids.push(...(p.items||[]).map(x=>x.contentDetails?.videoId).filter(validId));next=p.nextPageToken||"";pages++;
 }while(next&&pages<10);
 const entries=[];
 for(let k=0;k<ids.length;k+=50){
  const p=await yt("videos?part=snippet,status,statistics&id="+ids.slice(k,k+50).join(","),auth.token);
  entries.push(...(p.items||[]).filter(v=>v.snippet?.channelId===auth.channelId).map(v=>record(v,auth)));
 }
 const merged=merge(await readHistory(),entries);await writeHistory(merged);
 return {items:merged,channelId:auth.channelId,channelTitle:auth.channelTitle,scanned:ids.length,hasMore:!!next};
}
async function schedule(id,publishAt,confirmedChannelId){
 if(!validId(id))throw Error("Select a valid YouTube video.");
 const ts=Date.parse(publishAt);
 if(!Number.isFinite(ts)||ts<Date.now()+5*60*1000)throw Error("Choose a future time at least five minutes from now, including your timezone.");
 const auth=await getPublishingAuth();
 if(confirmedChannelId!==auth.channelId)throw Error("Channel selection changed. Confirm the destination before scheduling.");
 const video=await fetchVideo(id,auth),s=video.status||{};
 if(s.privacyStatus==="public")throw Error("Already public. YouTube does not allow scheduling a video that has been published.");
 if(s.privacyStatus!=="unlisted"&&s.privacyStatus!=="private")throw Error("Only Unlisted or Private videos may be scheduled.");
 const body={id,status:{privacyStatus:"private",publishAt:new Date(ts).toISOString()}};
 for(const key of ["embeddable","license","publicStatsViewable","selfDeclaredMadeForKids","containsSyntheticMedia"]){
  if(s[key]!==undefined)body.status[key]=s[key];
 }
 const result=await yt("videos?part=status",{...auth,token:auth.token}.token,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
 const checked=await fetchVideo(id,auth);
 if(checked.status?.privacyStatus!=="private"||!checked.status?.publishAt)throw Error("Schedule was submitted but could not be confirmed. Check YouTube Studio.");
 const rec=record(checked,auth),merged=merge(await readHistory(),[rec]);await writeHistory(merged);
 return {item:rec,channelId:auth.channelId};
}
export async function handlePublishing(req,res,url){
 if(!url.pathname.startsWith("/api/publishing/"))return false;
 if(req.headers.origin!=="http://127.0.0.1:43129"){json(res,403,{error:"Available only in the Clip Farm Mac app."});return true}
 try{
  if(req.method!=="POST")throw Error("POST required.");
  if(url.pathname==="/api/publishing/history"){json(res,200,{items:await readHistory()});return true}
  if(url.pathname==="/api/publishing/sync"){json(res,200,await syncChannel());return true}
  if(url.pathname==="/api/publishing/schedule"){
   const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>8000)throw Error("Request too large");chunks.push(chunk)}
   const input=JSON.parse(Buffer.concat(chunks).toString("utf8"));
   json(res,200,await schedule(String(input.youtubeId||""),String(input.publishAt||""),String(input.channelId||"")));return true;
  }
  json(res,404,{error:"Publishing endpoint not found"});return true
 }catch(e){json(res,400,{error:message(e)});return true}
}
