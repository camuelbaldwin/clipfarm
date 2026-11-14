import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(fileURLToPath(new URL("../",import.meta.url)),"..");
const worker=await readFile(resolve(root,"worker/index.js"),"utf8");
const script=worker.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(script,"Clip Farm browser script must exist");
new Function(script); // Catch malformed string concatenation and broken photo-card markup.
assert(!script.includes("'+photoPanel+\\n"),"Photo panel must be valid JavaScript concatenation");
assert(script.includes('id="batchPhotoTemplate"'),"Photo story JSON example must be accessible in existing interface");
assert(script.includes('$("batchPhotoTemplate").onclick'),"Photo-story example button must work");
assert(script.includes('headers:await localSessionHeaders(),body:form'),"Photo upload must pass local server authentication");
assert(script.includes('checkedStoryPhotos(v)'),"Photo sequences must be checked before creating payload");
assert(script.includes('for(const j of selected)checkedStoryPhotos(j)'),"Photo sequences must be checked before render submission");
assert(script.includes('missingStoryPhotos(v).length'),"Missing photo names must appear on the video card");

const start=script.indexOf("function photoFilename("),end=script.indexOf("function batchMedia()",start);
assert(start>=0&&end>start,"Photo validation utilities not found");
const utils=Function(script.slice(start,end)+";return {checkedStoryPhotos,missingStoryPhotos};")();
const story={title:"Leak",photos:[{url:"https://example.com/2.jpg",title:"water_leak.jpg"},{url:"https://example.com/1.jpg",title:"ac_unit.jpg"}],photoSequence:[{filename:"ac_unit.jpg"},{filename:"water_leak.jpg"}]};
assert.deepEqual(utils.checkedStoryPhotos(story).map(p=>p.title),["ac_unit.jpg","water_leak.jpg"],"Return photos in JSON order, not file-selection order");
assert.deepEqual(utils.missingStoryPhotos({...story,photos:[story.photos[0]]}),["ac_unit.jpg"],"Missing files must be identified by filename");
assert.throws(()=>utils.checkedStoryPhotos({...story,photos:[story.photos[0]]}),/Attach required story photos/,"Incomplete photo sequence must block rendering");
assert.throws(()=>utils.checkedStoryPhotos({...story,photoSequence:[{filename:"ac_unit.jpg"},{filename:"ac_unit.jpg"}]}),/Duplicate filenames/,"Duplicate JSON filenames must be rejected");
assert.throws(()=>utils.checkedStoryPhotos({...story,photos:[...story.photos,{url:"https://example.com/x.jpg",title:"extra.jpg"}]}),/Photo count differs/,"Unexpected extra images must block mismatched story");
assert.deepEqual(utils.checkedStoryPhotos({title:"No photos",photos:[],photoSequence:[]}),[],"Normal text-only video must continue working");
console.log("Clip Farm photo-story and inline UI syntax tests passed.");
