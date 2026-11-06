const html = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#10110f"><title>Clip Farm Studio</title>
<style>
:root{color-scheme:dark;--bg:#0e0d13;--panel:#1b1824;--panel2:#211d2b;--line:#3b354b;--text:#f4f2ea;--muted:#a5a79c;--lime:#bca4ff;--orange:#ff9e68;--red:#ff7676;--blue:#9ac8ff}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 78% -10%,#29213f 0,transparent 45%),var(--bg);color:var(--text);font:15px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}
button,input,select,textarea{font:inherit}button{cursor:pointer}a{color:var(--lime)}
.shell{max-width:1120px;margin:auto;padding:28px 24px 72px}.top{display:flex;justify-content:space-between;align-items:center;gap:16px;border-bottom:1px solid var(--line);padding-bottom:22px}
.brand{display:flex;align-items:center;gap:12px}.mark{width:42px;height:42px;border-radius:13px;background:var(--lime);color:#111;display:grid;place-items:center;font-size:22px;font-weight:900}.brand strong{font-size:16px;letter-spacing:.02em}.brand small{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.status-pill{border:1px solid var(--line);color:var(--muted);border-radius:999px;padding:8px 12px;font-size:12px;display:flex;gap:8px;align-items:center}.dot{width:8px;height:8px;border-radius:50%;background:#85877a}.dot.good{background:var(--lime);box-shadow:0 0 12px #c3f06b66}.dot.bad{background:var(--red)}
.hero{padding:34px 0 22px;display:flex;justify-content:space-between;align-items:end;gap:24px}.eyebrow{color:var(--lime);font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800}.hero h1{font-size:clamp(30px,5vw,52px);line-height:1.02;letter-spacing:-.05em;margin:9px 0 12px;max-width:720px}.hero p{color:var(--muted);margin:0;max-width:630px}.hero-side{color:var(--muted);font-size:12px;max-width:220px;text-align:right}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:18px 0 20px}.step{border:1px solid var(--line);border-radius:12px;padding:12px 14px;color:var(--muted);background:#141512}.step b{display:block;color:var(--text);font-size:12px;margin-bottom:3px}.step.active{border-color:#9bbf58;background:#22271a}.step.active b{color:var(--lime)}
.grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}.main{display:grid;gap:14px}.card{background:linear-gradient(145deg,#1b1c19,#171815);border:1px solid var(--line);border-radius:16px;padding:20px;box-shadow:0 8px 28px #0002}.cardhead{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px}.cardhead h2{font-size:17px;margin:0 0 5px;letter-spacing:-.02em}.cardhead p{margin:0;color:var(--muted);font-size:13px}.number{width:29px;height:29px;flex:none;border:1px solid #5d6947;border-radius:9px;color:var(--lime);display:grid;place-items:center;font-size:12px;font-weight:800}
.field{margin-top:13px}.field label{display:block;color:#d8d9d1;font-size:12px;font-weight:700;margin-bottom:7px}.field small{display:block;color:var(--muted);font-size:11px;margin-top:6px}
.input,select,textarea{width:100%;background:#11120f;color:var(--text);border:1px solid #3a3b34;border-radius:10px;padding:11px 12px;outline:none}.input:focus,select:focus,textarea:focus{border-color:#92b751;box-shadow:0 0 0 3px #c3f06b1a}textarea{min-height:82px;resize:vertical}
.upload{border:1px dashed #5a5c51;border-radius:12px;background:#131410;padding:16px;position:relative;transition:.15s}.upload:hover,.upload.drag{border-color:var(--lime);background:#1b2014}.upload input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.uploadrow{display:flex;align-items:center;gap:12px}.uploadicon{width:36px;height:36px;border-radius:10px;background:#2a3020;color:var(--lime);display:grid;place-items:center;font-size:19px}.upload strong{display:block;font-size:13px}.upload span{color:var(--muted);font-size:11px}.filelist{display:grid;gap:7px;margin-top:10px}.fileitem{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#22231f;border-radius:9px;padding:8px 10px;font-size:12px}.fileitem span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fileitem button{border:0;background:transparent;color:var(--muted);font-size:17px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.btn{border:1px solid var(--line);border-radius:10px;padding:10px 15px;color:var(--text);background:#282923;font-weight:750;font-size:13px;transition:.15s}.btn:hover{transform:translateY(-1px);border-color:#6b6e60}.btn.primary{background:var(--lime);color:#15101f;border-color:var(--lime)}.btn.primary:hover{background:#d2ff79}.btn:disabled{opacity:.45;cursor:not-allowed;transform:none}.btn.ghost{background:transparent}.btn.small{padding:7px 10px;font-size:11px}
#discoverPanel,#analysisPanel,#keywordPanel{display:none!important} #batchPanel .actions:has(#batchTemplate),#batchPanel .field:has(#batchFile),#batchPanel .field:has(#batchJson),#batchImport{display:none!important}.rail>section:nth-child(n+2){display:none!important}.legacy-setup{display:none!important}.rail{position:sticky;top:18px;display:grid;gap:14px}.rail .card{padding:17px}.rail h3{margin:0 0 10px;font-size:13px}.rail p{margin:0;color:var(--muted);font-size:12px}.connect{display:grid;gap:10px}.connrow{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px}.connrow .state{color:var(--muted)}.tiny{color:var(--muted);font-size:10px;line-height:1.5}.notice{border-left:3px solid var(--orange);padding:9px 11px;background:#2a201a;color:#e9c8b5;border-radius:0 8px 8px 0;font-size:11px;line-height:1.45}.notice.good{border-color:var(--lime);background:#202619;color:#d9edb7}.divider{height:1px;background:var(--line);margin:13px 0}
.result{display:none}.result.show{display:block}.analysis-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.analysis-part{background:#22231f;border:1px solid #31322b;border-radius:11px;padding:12px}.analysis-part b{display:block;font-size:12px;color:var(--lime);margin-bottom:5px}.analysis-part p{margin:0;font-size:12px;color:#d0d1c9;white-space:pre-wrap}
.variant-list{display:grid;gap:10px}.variant{background:#22231f;border:1px solid #34352e;border-radius:12px;padding:14px}.varianttop{display:flex;justify-content:space-between;align-items:center;gap:10px}.varianttop h3{font-size:14px;margin:0}.badge{border:1px solid #4d6040;color:var(--lime);border-radius:999px;padding:3px 8px;font-size:10px}.variant p{color:#c7c8c0;font-size:12px;white-space:pre-wrap;margin:10px 0 0}.video-card{background:#22231f;border-radius:12px;padding:12px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center}.video-card strong{font-size:12px}.video-card small{display:block;color:var(--muted);font-size:10px;margin-top:3px}.bar{height:5px;background:#3a3c34;border-radius:99px;margin-top:9px;overflow:hidden}.bar i{display:block;width:8%;height:100%;background:var(--lime);transition:width .4s}.preview{width:100%;max-height:280px;background:#080808;border-radius:11px;margin-top:12px}
.foot{margin-top:24px;text-align:center;color:#74766d;font-size:10px}.tabs{display:flex;gap:8px;margin:16px 0}.tab{border:1px solid var(--line);background:#171815;color:var(--muted);border-radius:10px;padding:9px 13px;font-weight:700;font-size:12px}.tab.on{border-color:#7d9654;color:var(--lime);background:#22271a}.tab-panel{display:none}.tab-panel.on{display:block}.spin{display:inline-block;width:13px;height:13px;border:2px solid #65675d;border-top-color:var(--lime);border-radius:50%;animation:spin .7s linear infinite;vertical-align:-2px;margin-right:6px}@keyframes spin{to{transform:rotate(360deg)}}
.platforms{display:flex;gap:8px;flex-wrap:wrap}.platforms label{display:flex;gap:6px;align-items:center;border:1px solid var(--line);background:#141512;border-radius:9px;padding:8px 10px;color:var(--muted);font-size:11px}.videolist{display:grid;gap:9px}.videoresult{display:grid;grid-template-columns:100px minmax(0,1fr) auto;align-items:center;gap:12px;padding:11px;background:#22231f;border:1px solid #34352e;border-radius:11px}.videoresult img{width:100px;height:70px;object-fit:cover;background:#111;border-radius:7px}.videoresult h3{font-size:12px;margin:0 0 4px}.videoresult p{font-size:10px;color:var(--muted);margin:0}.videoresult .statsrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;font-size:9px;color:#d6d7cf}.videoresult .actions{margin:0;display:grid}.videoresult.selected{border-color:#9bbf58}.platformtag{display:inline-block;border:1px solid #4d6040;color:var(--lime);border-radius:99px;padding:2px 6px;font-size:9px;margin-right:5px}@media(max-width:600px){.videoresult{grid-template-columns:70px minmax(0,1fr)}.videoresult img{width:70px;height:55px}.videoresult .actions{grid-column:1/-1;display:flex;justify-content:flex-end}.tabs{flex-wrap:wrap}}
@media(max-width:820px){.grid{grid-template-columns:1fr}.rail{position:static;grid-row:1}.hero{display:block}.hero-side{text-align:left;max-width:none;margin-top:14px}.steps{grid-template-columns:1fr 1fr}}@media(max-width:520px){.shell{padding:18px 14px 48px}.top{align-items:flex-start}.steps{gap:6px}.step{padding:9px}.card{padding:15px}.row,.analysis-grid{grid-template-columns:1fr}.status-pill{font-size:10px}.hero h1{font-size:37px}}
</style></head>
<body><div class="shell">
<header class="top"><div class="brand"><div class="mark">CF</div><div><strong>CLIP FARM STUDIO</strong><small>One workspace. One production line.</small></div></div><div class="status-pill"><i class="dot" id="topDot"></i><span id="topStatus">Connect your providers to start</span></div></header>
<section class="hero"><div><div class="eyebrow">Your prompt production workspace</div><h1>Research. Create.<br>Render. Publish.</h1><p>vidIQ research → Gemini scripts and SEO → Revid videos → YouTube approval. One production workflow.</p></div></section>
<div class="tabs"><button class="tab on" data-tab="pipeline">1 · Research + Create</button><button class="tab" data-tab="batch">2 · Render + Publish</button></div>
<div class="grid"><main class="main">
<section class="card tab-panel" id="discoverPanel"><div class="cardhead"><div><h2>Find videos by topic, niche, or keyword</h2><p>Search short-form videos across YouTube Shorts, Instagram Reels, and TikTok. The index matches the topic to video text; sort by best match, likes, or recency, then inspect the video description and public metrics.</p></div><div class="number">1</div></div>
<div class="row"><div class="field"><label for="videoSearchQuery">What videos are you looking for?</label><input class="input" id="videoSearchQuery" placeholder="e.g. fire safety myths explained"></div><div class="field"><label for="videoSort">Sort results</label><select id="videoSort"><option value="relevance">Best match</option><option value="popular">Most liked</option><option value="recent">Most recent</option></select></div></div>
<div class="field"><label>Search on</label><div class="platforms"><label><input type="checkbox" id="platformYt" checked> YouTube Shorts</label><label><input type="checkbox" id="platformIg" checked> Instagram Reels</label><label><input type="checkbox" id="platformTt" checked> TikTok</label></div></div>
<div class="row"><div class="field"><label for="videoLimit">Number of results</label><select id="videoLimit"><option value="6">6 videos</option><option value="12" selected>12 videos</option><option value="20">20 videos</option></select></div><div class="field"><label for="minLikes">Minimum likes (optional)</label><input class="input" id="minLikes" type="number" min="0" placeholder="No minimum"></div></div>
<div class="actions"><button class="btn primary" id="videoSearchBtn">Search videos</button><button class="btn ghost" id="viralOnlyBtn" aria-pressed="false">Viral/high engagement only: off</button></div><div id="searchMessage" class="tiny" style="margin-top:9px">Search uses Revid’s indexed public video research. It can return fewer results for a narrow query or platform.</div><div id="videoResults" class="videolist" style="margin-top:14px"></div></section>
<div class="tab-panel" id="analysisPanel"><section class="card"><div class="cardhead"><div><h2>1 · Add a reference video</h2><p>Upload a file, paste a social-media post URL, or use a direct video file URL.</p></div><div class="number">1</div></div>
<div class="field"><label>Video file</label><div class="upload" id="refDrop"><input id="refFile" type="file" accept="video/*"><div class="uploadrow"><div class="uploadicon">↥</div><div><strong>Choose a reference video</strong><span>MP4, MOV, or supported video · up to 50 MB</span></div></div></div><div class="filelist" id="refList"></div></div>
<div class="field"><label for="refUrl">Or paste a social post or direct video URL</label><input class="input" id="refUrl" placeholder="Public YouTube, Instagram, TikTok, Facebook, or MP4 link"><small>Public YouTube URLs go directly to Gemini. Instagram and TikTok links use Apify to extract videos and public engagement metrics; other social pages use the video resolver.</small></div><div class="actions"><button class="btn primary" id="analyzeBtn">Analyze video and build prompt</button></div>
<div class="row"><div class="field"><label for="niche">Topic or niche for your version</label><input class="input" id="niche" placeholder="e.g. fragrance science"></div><div class="field"><label for="searchBox">Search saved prompts</label><input class="input" id="searchBox" placeholder="Keyword, URL, or prompt"></div></div>
<div class="field"><label for="notes">Creative direction</label><textarea id="notes" placeholder="What should your video explain, demonstrate, or make the viewer feel?"></textarea></div>
<div class="actions"><button class="btn ghost" id="startPromptBtn">Start with my own prompt</button><button class="btn ghost" id="recoverBtn">Find saved prompts</button></div><div class="notice" style="margin-top:12px">Public YouTube links go straight to Gemini. Other social-page links use Apify to find the video file; charges may apply. The video must be public and fetchable. Private, age-restricted, login-gated, and blocked posts may fail. The analysis extracts transferable techniques for original work.</div></section>
<section class="card result" id="analysisCard"><div class="cardhead"><div><h2>2 · Video breakdown</h2><p>Review the elements Gemini identified.</p></div><div class="number">2</div></div><div id="analysisSummary" class="analysis-grid"></div><details class="field"><summary>Full structured analysis</summary><textarea id="analysisRaw" readonly style="min-height:180px"></textarea></details></section>
<section class="card result" id="promptCard"><div class="cardhead"><div><h2>3 · Editable prompt</h2><p>Copy it to another video generator, or render a rough cut here.</p></div><div class="number">3</div></div>
<div class="field"><label for="prompt">Video prompt</label><textarea id="prompt" style="min-height:140px" placeholder="Your generated prompt will appear here."></textarea></div><div class="field"><label for="stylePrompt">Visual style instructions</label><textarea id="stylePrompt" placeholder="Pacing, animation treatment, camera language, captions, audio."></textarea></div><div class="field"><label for="script">Optional narration script</label><textarea id="script" placeholder="Leave blank to let the video generator write narration from the prompt."></textarea></div>
<div class="row"><div class="field"><label for="visualType">Video style</label><select id="visualType"><option value="ai-video">AI video</option><option value="anime">Anime</option><option value="motion-graphics">Motion graphics</option><option value="stock-video">Stock footage</option></select></div><div class="field"><label for="duration">Length</label><select id="duration"><option value="20">20 seconds</option><option value="30" selected>30 seconds</option><option value="40">40 seconds</option><option value="60">60 seconds</option></select></div></div>
<div class="row"><div class="field"><label for="ratio">Aspect ratio</label><select id="ratio"><option value="9:16">Vertical · 9:16</option><option value="16:9">Landscape · 16:9</option><option value="1:1">Square · 1:1</option></select></div><div class="field"><label for="renderMode">Render from</label><select id="renderMode"><option value="prompt-to-video">Prompt · generator writes narration</option><option value="script-to-video">My script · use narration above</option></select></div></div>
<div class="actions"><button class="btn ghost" id="copyBtn">Copy prompt</button><button class="btn ghost" id="savePromptBtn">Save prompt</button><button class="btn primary" id="renderBtn">Estimate and render rough cut</button></div><div class="tiny" id="renderInfo" style="margin-top:9px">The app shows estimated Revid credits and asks before starting a render.</div></section>
<section class="card result" id="renderCard"><div class="cardhead"><div><h2>4 · Draft preview</h2><p>Render status and video preview.</p></div><div class="number">4</div></div><div class="tiny" id="renderStatus"></div><video id="draftVideo" class="preview" controls style="display:none"></video><div class="actions"><button class="btn ghost" id="refreshBtn">Refresh status</button><a class="btn ghost" id="openDraft" target="_blank" rel="noreferrer" style="display:none">Open rendered video</a></div></section>
</div>
<section class="card tab-panel on" id="pipelinePanel">
<div class="cardhead"><div><h2>Research → Create → Revid → YouTube</h2><p>Produce an original five-video batch inside Clip Farm. No Make scenario or JSON download.</p></div><div class="number">P</div></div>
<div class="notice">vidIQ researches real video breakouts and keyword estimates. Gemini drafts original scripts, visuals and SEO. Check claims before rendering; publishing always requires your approval.</div>
<div class="row"><div class="field"><label for="pipelineTopic">Channel niche / research topic</label><input class="input" id="pipelineTopic" value="building engineering explained" placeholder="e.g. expensive building failures"></div><div class="field"><label for="pipelineCount">Draft videos</label><select id="pipelineCount"><option value="3">3</option><option value="5" selected>5</option><option value="10">10</option></select></div></div>
<div class="field"><label for="pipelineDirection">Creative direction</label><textarea id="pipelineDirection">Original educational Shorts with a startling visual hook, technically careful explanations, realistic 3D cutaways, 35–45 seconds, clear narration and large captions. Focus on physical mechanisms rather than trivia.</textarea></div>
<div class="actions"><button class="btn ghost" id="pipelineLoadFive">Use our 5 researched videos</button></div><div class="actions"><button class="btn primary" id="pipelineResearch">1 · Research via vidIQ</button><button class="btn ghost" id="pipelineGenerate" disabled>2 · Write scripts + SEO</button><button class="btn ghost" id="pipelineQueue" disabled>3 · Send to render queue</button></div>
<div class="tiny" id="pipelineStatus" role="status" aria-live="polite" style="margin:12px 0">Connect vidIQ, Gemini and Revid in API connections. Research does not trigger a Revid render.</div>
<div class="videolist" id="pipelineRefs"></div>
<h3 style="font-size:14px;margin-top:18px">Generated videos</h3><div class="videolist" id="pipelineDrafts"><span class="tiny">No drafts yet.</span></div>
</section>
<section class="card tab-panel" id="batchPanel">
<div class="cardhead"><div><h2>Render + Publish</h2><p>Import video scripts, estimate the cost, render up to five simultaneously, review each result, and explicitly approve YouTube publishing.</p></div><div class="number">B</div></div>
<div class="notice good"><b>Production:</b> Drafts from Research + Create arrive here automatically. Estimate Revid credits, approve the render spend, keep Clip Farm open while rendering, preview finished videos, then approve publishing individually.</div>
<div class="actions"><button class="btn ghost" id="batchTemplate">Download JSON example</button><button class="btn ghost" id="batchExport">Export queue/status</button></div>
<div class="field"><label for="batchFile">Import video batch (.json)</label><input id="batchFile" type="file" accept=".json,application/json" class="input"><small>Format: title, script, prompt, stylePrompt, referenceUrl, and optional seo: {title, description, primaryKeyword, tags}. Importing replaces the visible queue; it does not start rendering.</small></div>
<div class="field"><label for="batchJson">Or paste a JSON array</label><textarea id="batchJson" style="min-height:110px" placeholder='[{"title":"Why Elevators Are Safe","script":"...","prompt":"3D elevator cutaway...","referenceUrl":"https://www.youtube.com/watch?v=..."}]'></textarea></div>
<div class="field"><label for="batchMode">Production mode</label><select id="batchMode"><option value="script-to-video">Exact narration · Revid chooses visuals</option><option value="prompt-to-video">Detailed visuals · Revid may rewrite narration</option></select><small>Revid script-to-video accepts the exact spoken script, but not a separate scene prompt. Choose visual-direction mode to send your detailed visual prompt; Revid may rewrite the narration.</small></div><div class="row"><div class="field"><label for="batchStyle">Video style</label><select id="batchStyle"><option value="ai-video">AI visuals · Pro</option><option value="motion-graphics">Motion graphics</option><option value="stock-video">Stock footage</option><option value="anime">Anime</option></select></div><div class="field"><label for="batchResolution">Render resolution</label><select id="batchResolution"><option value="720p">720p</option><option value="1080p">1080p</option></select></div></div>
<div class="field"><label for="batchConcurrency">Simultaneous Revid jobs</label><select id="batchConcurrency"><option value="1">1 at a time · safest</option><option value="2">2 at once</option><option value="3">3 at once</option><option value="5" selected>5 at once · depends on Revid account limits</option></select><small>Separate videos are submitted as separate Revid jobs. Parallel rendering may be rate-limited by Revid. Your credits are estimated for all selected jobs.</small></div><div class="actions"><button class="btn" id="batchImport">Import / replace queue</button><button class="btn" id="batchEstimate">Estimate selected credits</button><button class="btn primary" id="batchStart" disabled>Start selected renders</button><button class="btn ghost" id="batchStop" disabled>Stop submitting new jobs</button></div>
<div class="tiny" id="batchSummary" style="margin:12px 0">No videos imported. Revid credits are charged only when a render is submitted.</div>
<section class="card" style="margin:16px 0;background:#16121e">
<h3 style="margin:0 0 4px">Use videos already made in Revid</h3>
<p class="tiny">Load your existing Revid projects, select the videos to prepare, and generate or import their YouTube SEO. Project IDs keep all metadata with the right video. No new renders.</p>
<div class="actions"><button class="btn primary" id="existingLoadProjects">1 · Load Revid videos</button><button class="btn ghost" id="existingGenerateSeo">2 · Create SEO for selected videos</button></div>
<div class="actions"><label class="btn ghost" for="existingSeoImport">Import SEO JSON package</label><input type="file" id="existingSeoImport" accept=".json,application/json" style="position:absolute;left:-9999px" aria-label="Import SEO JSON package"><button class="btn ghost" id="existingSeoExport">Download matched SEO package</button><button class="btn ghost" id="existingLoadSeo">Use our 5 older SEO topics</button></div>
<div class="tiny" id="existingStatus" role="status" aria-live="polite">Choose a Revid video, then choose the SEO metadata that belongs to it.</div>
<div class="videolist" id="existingProjects" style="margin-top:10px"></div>
</section>
<div class="field"><label>Revid-connected YouTube account</label><div class="row"><select class="input" id="batchYoutubeAccount"><option value="">Load YouTube accounts</option></select><button class="btn ghost" id="batchLoadAccounts">Load accounts</button></div><small>Connect your YouTube channel in Revid. Publishing requires per-video approval. Publishing uses the researched title and description; YouTube keyword tags may still need to be pasted into YouTube Studio because the Revid API does not document a YouTube tags field.</small></div><div class="videolist" id="batchList"></div>
</section><section class="card tab-panel" id="keywordPanel"><div class="cardhead"><div><h2>Google keyword metrics</h2><p>Enter a keyword to see estimated monthly searches, historical volume, competition, bids, and related keyword ideas.</p></div><div class="number">K</div></div><div class="row"><div class="field"><label for="keyword">Keyword or topic</label><input class="input" id="keyword" placeholder="e.g. perfume layering"></div><div class="field"><label for="location">Search location</label><select id="location"><option value="United States">United States</option><option value="Worldwide">Worldwide</option><option value="United Kingdom">United Kingdom</option><option value="Canada">Canada</option><option value="Australia">Australia</option><option value="India">India</option></select></div></div><div class="actions"><button class="btn primary" id="trendBtn">Get keyword metrics</button></div><div class="result" id="trendResult" style="margin-top:14px"><div class="analysis-grid"><div class="analysis-part"><b>AVG. MONTHLY SEARCHES</b><p id="searchVolume">Not available</p></div><div class="analysis-part"><b>ADS COMPETITION</b><p id="adsCompetition">Not available</p></div><div class="analysis-part"><b>COMPETITION INDEX</b><p id="competitionIndex">Not available</p></div><div class="analysis-part"><b>TOP-OF-PAGE BID RANGE</b><p id="bidRange">Not available</p></div></div><div id="trendChart" style="display:flex;align-items:end;height:130px;gap:3px;margin-top:14px"></div><div id="trendDates" class="tiny"></div><div class="field"><label>Related keyword ideas</label><div id="relatedList"></div></div><div class="tiny" id="trendNote"></div></div><div class="notice good" style="margin-top:13px">Google Ads API keyword research is free to call. This feature only reads estimates; it never creates ads or spends campaign budget. Add Google OAuth credentials and a Google Ads customer ID in API connections. Metrics are Google Search estimates; the competition score describes ad placement competition, not organic ranking difficulty.</div></section>
</main><aside class="rail">
<section class="card"><h3>API connections</h3><p>Keys are saved only in this browser or app profile. The app sends each key to its provider when you use that feature. Clear saved keys any time.</p><div class="field"><label for="geminiKey">Gemini API key</label><input class="input" id="geminiKey" type="password" autocomplete="off" placeholder="Paste key"></div><div class="field"><label for="revidKey">Revid API key</label><input class="input" id="revidKey" type="password" autocomplete="off" placeholder="Paste key"></div><div class="field"><label for="vidiqKey">vidIQ MCP API key</label><input class="input" id="vidiqKey" type="password" autocomplete="off" placeholder="Create in vidIQ Account Settings → MCP"><small><a href="https://app.vidiq.com/account/settings/mcp" target="_blank" rel="noreferrer">Get vidIQ API key</a> · Uses vidIQ credits.</small></div><div class="legacy-setup"><div class="field"><label for="apifyKey">Apify API token · social link extraction</label><input class="input" id="apifyKey" type="password" autocomplete="off" placeholder="Paste token"></div><details class="field"><summary style="cursor:pointer;font-size:12px;font-weight:700">Google Ads keyword API connection</summary><p class="tiny" style="margin:7px 0">Enable the Google Ads API in your Cloud project and request Explorer access for live account data. Generate OAuth credentials and a refresh token with the <code>https://www.googleapis.com/auth/adwords</code> scope, then enter them below. Test-only access cannot query live accounts. These credentials are saved only in this browser or app profile.</p><div class="field"><label for="adsClientId">OAuth client ID</label><input class="input" id="adsClientId" autocomplete="off" placeholder="Google Cloud OAuth client ID"></div><div class="field"><label for="adsClientSecret">OAuth client secret</label><input class="input" id="adsClientSecret" type="password" autocomplete="off" placeholder="Google Cloud OAuth client secret"></div><div class="field"><label for="adsRefreshToken">OAuth refresh token</label><input class="input" id="adsRefreshToken" type="password" autocomplete="off" placeholder="Refresh token with adwords scope"></div><div class="field"><label for="adsCustomerId">Google Ads customer ID</label><input class="input" id="adsCustomerId" inputmode="numeric" autocomplete="off" placeholder="10 digits, no hyphens"></div><div class="field"><label for="adsLoginCustomerId">Manager customer ID · optional</label><input class="input" id="adsLoginCustomerId" inputmode="numeric" autocomplete="off" placeholder="Only if accessing through a manager"></div><div class="tiny"><a href="https://console.cloud.google.com/apis/library/googleads.googleapis.com" target="_blank" rel="noreferrer">Enable Google Ads API</a> · <a href="https://developers.google.com/google-ads/api/docs/productionize/access-levels" target="_blank" rel="noreferrer">Request Explorer access</a> · <a href="https://developers.google.com/oauthplayground/" target="_blank" rel="noreferrer">OAuth Playground</a>. Use your own OAuth client in the Playground and the <code>adwords</code> scope. Cloud project access replaces the old developer-token setup.</div></details></div><div class="actions"><button class="btn small primary" id="saveKeysBtn">Save keys</button><button class="btn small ghost" id="forgetBtn">Clear saved keys</button><span class="tiny" id="keysStatus" role="status" aria-live="polite"></span></div><div class="tiny" style="margin-top:8px">vidIQ supplies video intelligence; Gemini generates scripts and metadata; Revid renders and publishes to connected YouTube accounts.</div></section>
<section class="card"><h3>Reference preview + stats</h3><video id="sourcePreview" class="preview" controls style="display:none"></video><iframe id="youtubePreview" class="preview" title="YouTube reference preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display:none;height:200px;border:0"></iframe><div class="analysis-grid" style="margin-top:10px"><div class="analysis-part"><b>VIDEO</b><p id="metaFile">None</p></div><div class="analysis-part"><b>LENGTH</b><p id="metaDuration">—</p></div><div class="analysis-part"><b>ANALYSIS</b><p id="metaState">Waiting</p></div><div class="analysis-part"><b>SAVED PROMPTS</b><p id="metaCount">0</p></div></div><div id="selectedStats" class="analysis-grid" style="margin-top:8px"></div><div id="selectedDescription" class="analysis-part" style="display:none;margin-top:8px"><b>VIDEO DESCRIPTION</b><p id="descriptionText" style="max-height:220px;overflow:auto"></p></div><a id="postLink" class="tiny" target="_blank" rel="noreferrer" style="display:none;margin-top:7px">Open original social post</a></section>
<section class="card"><h3>Recover a prompt</h3><p>Prompts are saved in this browser and searchable by topic, source, or prompt text.</p><div id="historyList" class="variant-list" style="margin-top:10px"></div></section>
</aside></div><div class="foot">Private workspace · No automatic publishing · Review generated details before rendering</div></div>
<script>
const $=id=>document.getElementById(id),S={file:null,analysis:null,pid:"",results:[],selected:null,referenceMediaUrl:"",referenceSource:""},STORE="clipfarm-prompts-v2",KEY_STORE="clipfarm-api-keys-v1";
const keys=()=>({gemini:$("geminiKey").value.trim(),vidiq:$("vidiqKey").value.trim(),revid:$("revidKey").value.trim(),apify:$("apifyKey").value.trim(),adsClientId:$("adsClientId").value.trim(),adsClientSecret:$("adsClientSecret").value.trim(),adsRefreshToken:$("adsRefreshToken").value.trim(),adsCustomerId:$("adsCustomerId").value.replace(/\D/g,""),adsLoginCustomerId:$("adsLoginCustomerId").value.replace(/\D/g,"")});
const say=x=>$("topStatus").textContent=x,esc=x=>String(x||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function hist(){try{return JSON.parse(localStorage.getItem(STORE)||"[]")}catch(e){return[]}}
function drawHistory(){let q=($("searchBox").value||"").toLowerCase(),a=hist().filter(x=>(x.topic+" "+x.source+" "+x.prompt).toLowerCase().includes(q));$("historyList").innerHTML=a.slice(0,30).map(x=>'<button class="btn ghost" data-id="'+esc(x.id)+'" style="width:100%;text-align:left;margin:3px 0">'+esc(x.topic||x.source||"Saved prompt")+'<small style="display:block;color:#a5a79c">'+new Date(x.date).toLocaleDateString()+' · '+esc((x.prompt||"").slice(0,60))+'</small></button>').join("")||'<span class="tiny">No saved prompts match.</span>';$("metaCount").textContent=hist().length}
function save(x){let a=hist();a.unshift({...x,id:Date.now().toString(),date:new Date().toISOString()});localStorage.setItem(STORE,JSON.stringify(a.slice(0,100)));drawHistory()}
async function api(p,d){let r=await fetch(p,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(d)}),j=await r.json().catch(()=>({error:"Unreadable response"}));if(!r.ok||j.error)throw Error(j.error||"Request failed");return j}
function parse(s){
 s=String(s||"").trim();
 const fenced=s.match(/\x60\x60\x60(?:json)?\s*([\s\S]*?)\x60\x60\x60/i);if(fenced)s=fenced[1].trim();
 try{return JSON.parse(s)}catch{}
 for(let start=0;start<s.length;start++){
  if(s[start]!=="{"&&s[start]!=="[")continue;
  let stack=[],quoted=false,escape=false;
  for(let i=start;i<s.length;i++){
   const c=s[i];if(quoted){if(escape)escape=false;else if(c==="\\")escape=true;else if(c==='"')quoted=false;continue}
   if(c==='"'){quoted=true;continue}if(c==="{"||c==="[")stack.push(c);else if(c==="}"||c==="]"){const open=stack.pop();if((open==="{"&&c!=="}")||(open==="["&&c!=="]"))break;if(!stack.length){try{return JSON.parse(s.slice(start,i+1))}catch{break}}}
  }
 }
 const sample=s.slice(0,180).replace(/\s+/g," ");throw Error("Gemini replied, but its response was not valid JSON. Try analyzing again. Response started: "+(sample||"(empty response)"))
}
function out(x){if(x==null)return"";if(typeof x==="string")return x;if(Array.isArray(x))return x.map(out).filter(Boolean).join("\n");if(typeof x!=="object")return String(x);for(const k of ["output_text","text"])if(typeof x[k]==="string"&&x[k].trim())return x[k];for(const k of ["output","outputs","content","parts"])if(x[k]!=null){const v=out(x[k]);if(v)return v}return""}
function err(e){say("Action failed · "+e.message);alert(e.message)}
const fmt=x=>x==null||x===""?"—":Number(x).toLocaleString(),fmtMetric=x=>x==null||x===""?"Not publicly available":fmt(x);
function showTab(name){document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("on",b.dataset.tab===name));$("discoverPanel").classList.toggle("on",name==="discover");$("analysisPanel").classList.toggle("on",name==="analyze");$("keywordPanel").classList.toggle("on",name==="keywords");$("batchPanel").classList.toggle("on",name==="batch");$("pipelinePanel").classList.toggle("on",name==="pipeline")}
function descriptionOf(v){let t=v.description||v.caption||v.summary||"";if(typeof t==="string"&&t.trim())return t;if(Array.isArray(t))return t.map(x=>typeof x==="string"?x:(x.text||x.content||"")).filter(Boolean).join("\n");if(t&&typeof t==="object")return t.text||t.content||"";return""}
function showSelected(v){S.selected=v;$("youtubePreview").style.display="none";$("youtubePreview").removeAttribute("src");let e=v.engagement||{},a=v.author||{},sty=v.style||{},description=descriptionOf(v);$("sourcePreview").style.display=v.videoUrl?"block":"none";if(v.videoUrl){$("sourcePreview").src=v.videoUrl;$("sourcePreview").onloadedmetadata=()=>{$("metaDuration").textContent=Math.round($("sourcePreview").duration)+" sec"}}$("metaFile").textContent=v.description||v.summary||a.nickname||v.platform||"Selected video";$("metaState").textContent=v.platform||"Discovered";$("metaDuration").textContent=v.durationInSeconds?Math.round(v.durationInSeconds)+" sec":"—";$("selectedStats").innerHTML=[["VIEWS",fmt(e.views)],["LIKES",fmt(e.likes)],["COMMENTS",fmt(e.comments)],["SHARES",fmt(e.shares)],["ENGAGEMENT",e.engagementRate==null?"—":(e.engagementRate*100).toFixed(2)+"%"],["STYLE",[sty.mood,sty.shootingStyle].filter(Boolean).join(" · ")||"—"]].map(x=>'<div class="analysis-part"><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p></div>').join("");$("selectedDescription").style.display=description?"block":"none";$("descriptionText").textContent=description;if(v.url){$("postLink").href=v.url;$("postLink").style.display="block"}else $("postLink").style.display="none";document.querySelectorAll("[data-video-id]").forEach(x=>x.classList.toggle("selected",x.dataset.videoId===v.id))}
function drawVideos(videos){S.results=videos||[];$("videoResults").innerHTML=S.results.map((v,i)=>{let e=v.engagement||{},a=v.author||{},title=v.summary||v.description||v.hook||"Video reference",url=v.url||"#";return'<article class="videoresult" data-video-id="'+esc(v.id||String(i))+'"><img src="'+esc(v.thumbnailUrl||"")+'" alt=""><div><span class="platformtag">'+esc((v.platform||"video").toUpperCase())+'</span><span class="platformtag">'+esc(v.engagementTier||"indexed")+'</span><h3>'+esc(title.slice(0,145))+'</h3><p>'+esc(a.nickname||a.username||"")+' · '+esc(v.postedAt||"")+'</p><div class="statsrow"><span>'+fmt(e.views)+' views</span><span>'+fmt(e.likes)+' likes</span><span>'+fmt(e.comments)+' comments</span><span>'+fmt(e.shares)+' shares</span></div></div><div class="actions"><button class="btn small ghost" data-action="preview" data-index="'+i+'">Preview</button><button class="btn small primary" data-action="analyze" data-index="'+i+'" '+(v.videoUrl?"":"disabled")+'>Analyze</button><a class="btn small ghost" href="'+esc(url)+'" target="_blank" rel="noreferrer">Open post</a></div></article>'}).join("")||'<div class="tiny">No matching videos returned. Try a broader topic or another platform.</div>';if(S.results.length)showSelected(S.results[0])}
async function searchVideos(){let k=keys(),q=$("videoSearchQuery").value.trim();if(!q)return alert("Enter a topic, niche, or keyword.");if(!k.revid)return alert("Enter your Revid API key to search the video index.");let platforms=[];if($("platformYt").checked)platforms.push("youtube");if($("platformIg").checked)platforms.push("instagram");if($("platformTt").checked)platforms.push("tiktok");if(!platforms.length)return alert("Choose at least one platform.");let b=$("videoSearchBtn");b.disabled=true;b.textContent="Searching video index…";$("searchMessage").textContent="Searching indexed short-form videos…";try{let d=await api("/api/revid/search",{key:k.revid,query:q,platforms,sort:$("videoSort").value,limit:Number($("videoLimit").value),minLikes:Number($("minLikes").value)||0,viralOnly:$("viralOnlyBtn").dataset.on==="true"});drawVideos(d.videos||[]);let lim=d.rateLimit?" · "+d.rateLimit.limitPerDay+" searches/day for this plan":"";$("searchMessage").textContent=(d.count||0)+" results for “"+q+"” · ranked by "+$("videoSort").value+lim;say("Video search complete")}catch(e){$("searchMessage").textContent=e.message;err(e)}finally{b.disabled=false;b.textContent="Search videos"}}
$("videoSearchBtn").onclick=searchVideos;$("viralOnlyBtn").onclick=()=>{let b=$("viralOnlyBtn"),on=b.dataset.on!=="true";b.dataset.on=String(on);b.setAttribute("aria-pressed",String(on));b.textContent="Viral/high engagement only: "+(on?"on":"off")};
$("videoResults").onclick=e=>{let b=e.target.closest("[data-action]"),card=e.target.closest("[data-video-id]");if(!b){if(card){let v=S.results.find(x=>(x.id||"")===card.dataset.videoId)||S.results[Number(card.dataset.videoId)];if(v)showSelected(v)}return}let v=S.results[Number(b.dataset.index)];if(!v)return;showSelected(v);if(b.dataset.action==="analyze"){S.referenceMediaUrl=v.videoUrl;S.referenceSource=v.url||v.videoUrl;$("refUrl").value=v.videoUrl||"";$("niche").value=$("videoSearchQuery").value.trim();showTab("analyze");analyze()}};
async function buildPrompt(){let k=keys(),d=await api("/api/gemini/prompt",{key:k.gemini,analysis:S.analysis,topic:$("niche").value.trim()||"original video for a similar audience",direction:$("notes").value.trim()}),v=parse(out(d.response));$("prompt").value=v.prompt||"";$("stylePrompt").value=v.stylePrompt||"";$("script").value=v.script||"";$("promptCard").classList.add("show");save({topic:$("niche").value,source:S.referenceSource||$("refUrl").value||(S.file&&S.file.name)||"upload",prompt:v.prompt,stylePrompt:v.stylePrompt,script:v.script,analysis:S.analysis});say("Editable prompt ready · saved in history")}
function directMedia(u){try{let x=new URL(u);return /\.(mp4|webm|mov|avi|m4v)(?:$)/i.test(x.pathname)||x.hostname==="cdn.revid.ai"}catch(e){return false}}
function youtubeVideoId(raw){try{let u=new URL(raw),host=u.hostname.toLowerCase().replace(/^www\./,""),id="";if(host==="youtu.be")id=u.pathname.split("/").filter(Boolean)[0]||"";else if(["youtube.com","m.youtube.com","music.youtube.com","youtube-nocookie.com"].includes(host)){if(u.pathname==="/watch")id=u.searchParams.get("v")||"";else{let m=u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/);if(m)id=m[1]}}return /^[A-Za-z0-9_-]{11}$/.test(id)?id:""}catch(e){return""}}
function canonicalYoutubeUrl(id){return"https://www.youtube.com/watch?v="+id}
async function extractSocial(u,token){if(!token)throw Error("Paste your Apify API token in API connections to extract a public social-media video.");const r=await api("/api/apify/extract",{token,url:u});let asset=null,metrics=null,metricsDone=!r.metricsRunId,metricsError=r.metricsError||"";for(let i=0;i<60;i++){await new Promise(ok=>setTimeout(ok,2000));if(!asset){const d=await api("/api/apify/extract-status",{token,runId:r.runId});if(d.failed)throw Error(d.error||"Apify could not extract this video. It may be private, blocked, or unsupported.");if(d.done)asset=d.asset}if(!metricsDone){const d=await api("/api/apify/metrics-status",{token,runId:r.metricsRunId,platform:r.metricsPlatform});if(d.done){metricsDone=true;if(d.failed)metricsError=d.error||"The platform metrics scraper could not read this post.";else metrics=d.metrics}}if(asset&&metricsDone)return {...asset,...(metrics||{}),metricsError}}if(asset)return {...asset,...(metrics||{}),metricsError:metricsError||"Metrics are still processing. Retry the URL to refresh them."};throw Error("Video extraction is taking too long. Try the direct video URL or upload the file.")}
async function analyze(){
 let k=keys(),url=$("refUrl").value.trim();
 if(!S.file&&!S.referenceMediaUrl&&!url)return alert("Choose a video or paste its social-media URL.");
 if(!k.gemini)return alert("Enter a Gemini API key.");
 let b=$("analyzeBtn");b.disabled=true;b.textContent="Analyzing and writing prompt…";say("Preparing reference video");$("metaState").textContent="Preparing";
 try{
  let p,mediaUrl=S.referenceMediaUrl||url;
  const analysisInstruction="Analyze the video; return JSON with summary, duration_seconds, hook, structure as timestamped beats, pacing, shot_and_cut_pattern, captions_and_text, audio, transitions, visual_style, ending, reusable_techniques array. Tie observations to timestamps. Describe transferable format mechanics without copying exact dialogue or distinctive scenes.";
  if(S.file){
   let f=new FormData();f.append("key",k.gemini);f.append("name",S.file.name);f.append("mimeType",S.file.type||"video/mp4");f.append("prompt",analysisInstruction);f.append("video",S.file);
   let r=await fetch("/api/gemini/analyze",{method:"POST",body:f});p=await r.json();if(!r.ok||p.error)throw Error(p.error||"Video analysis failed");$("metaFile").textContent=S.file.name;
  }else{
   let ytId=youtubeVideoId(mediaUrl);
   if(!directMedia(mediaUrl)&&!ytId){
    const u=new URL(mediaUrl),h=u.hostname.toLowerCase();let costNote="The video resolver starts at $0.005 per run.";if(h.includes("instagram.com"))costNote+=" Instagram metrics start at $1.50 per 1,000 results.";else if(h.includes("tiktok.com"))costNote+=" TikTok metrics start at $1.70 per 1,000 results.";costNote+=" Actor compute charges may also apply. Continue?";if(!confirm("Apify will extract the video"+(h.includes("instagram.com")||h.includes("tiktok.com")?" and retrieve public engagement metrics":"")+". "+costNote))return;
    say("Extracting public video from social page");$("metaState").textContent="Extracting";
    let found=await extractSocial(mediaUrl,k.apify);if(!found||!found.url)throw Error("The extractor did not return a playable video file.");mediaUrl=found.url;$("metaFile").textContent=found.title||"Social video";
    if(found.duration)$("metaDuration").textContent=Math.round(found.duration)+" sec";
    $("selectedStats").innerHTML=[["VIEWS",fmtMetric(found.views)],["LIKES",fmtMetric(found.likes)],["COMMENTS",fmtMetric(found.comments)],["SHARES",fmtMetric(found.shares)],["SAVES",fmtMetric(found.saves)],["REPOSTS",fmtMetric(found.reposts)],["METRICS SOURCE",found.metricsSource||"Public extractor"],...(found.metricsError?[["METRICS NOTE",found.metricsError]]:[])].map(x=>'<div class="analysis-part"><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p></div>').join("");
    if(url){$("postLink").href=url;$("postLink").style.display="block"}if(!S.referenceSource)S.referenceSource=url;
   }
   if(ytId){
    mediaUrl=canonicalYoutubeUrl(ytId);$("sourcePreview").style.display="none";$("sourcePreview").removeAttribute("src");
    $("youtubePreview").src="https://www.youtube-nocookie.com/embed/"+ytId;$("youtubePreview").style.display="block";$("metaFile").textContent="Public YouTube video";
   }else{
    $("youtubePreview").style.display="none";$("youtubePreview").removeAttribute("src");$("sourcePreview").src=mediaUrl;$("sourcePreview").style.display="block";
    $("sourcePreview").onloadedmetadata=()=>{$("metaDuration").textContent=Math.round($("sourcePreview").duration)+" sec"};
   }
   $("metaState").textContent="Analyzing";
   p=await api("/api/gemini/analyze",{key:k.gemini,videoUrl:mediaUrl,name:"reference-video",mimeType:"video/mp4",prompt:analysisInstruction});
  }
  S.analysis=parse(out(p.response));$("analysisRaw").value=JSON.stringify(S.analysis,null,2);
  let f=[["HOOK",S.analysis.hook],["STRUCTURE",S.analysis.structure],["PACING",S.analysis.pacing],["VISUAL RHYTHM",S.analysis.shot_and_cut_pattern],["CAPTIONS + SOUND",(S.analysis.captions_and_text||"")+"\n"+(S.analysis.audio||"")],["VISUAL STYLE",S.analysis.visual_style],["TRANSITIONS",S.analysis.transitions],["ENDING",S.analysis.ending]].filter(x=>x[1]);
  $("analysisSummary").innerHTML=f.map(x=>'<div class="analysis-part"><b>'+esc(x[0])+'</b><p>'+esc(typeof x[1]==="string"?x[1]:JSON.stringify(x[1]))+'</p></div>').join("");$("analysisCard").classList.add("show");$("metaState").textContent="Analyzed";await buildPrompt();$("analysisCard").scrollIntoView({behavior:"smooth"});
 }catch(e){err(e);$("metaState").textContent="Failed"}finally{b.disabled=false;b.textContent="Analyze and build prompt"}
}
$("analyzeBtn").onclick=analyze;$("refUrl").oninput=()=>{S.file=null;$("refFile").value="";$("refList").innerHTML="";if(S.url)URL.revokeObjectURL(S.url);S.url="";S.referenceMediaUrl="";S.referenceSource="";S.analysis=null;$("analysisCard").classList.remove("show");$("promptCard").classList.remove("show");$("renderCard").classList.remove("show");$("selectedStats").innerHTML="";$("postLink").style.display="none";$("youtubePreview").style.display="none";$("youtubePreview").removeAttribute("src");$("sourcePreview").style.display="none";$("sourcePreview").removeAttribute("src")};$("refFile").onchange=e=>{S.file=e.target.files[0]||null;if(S.file)$("refUrl").value="";S.referenceMediaUrl="";S.referenceSource="";$("refList").innerHTML=S.file?'<div class="fileitem">'+esc(S.file.name)+' · '+(S.file.size/1048576).toFixed(1)+' MB</div>':"";$("metaFile").textContent=S.file?S.file.name:"None";$("selectedStats").innerHTML="";$("postLink").style.display="none";if(S.url)URL.revokeObjectURL(S.url);S.url=S.file?URL.createObjectURL(S.file):"";$("sourcePreview").style.display=S.file?"block":"none";$("youtubePreview").style.display="none";$("youtubePreview").removeAttribute("src");if(S.file){$("sourcePreview").src=S.url;$("sourcePreview").onloadedmetadata=()=>{$("metaDuration").textContent=Math.round($("sourcePreview").duration)+" sec"}}};
$("searchBox").oninput=drawHistory;$("recoverBtn").onclick=drawHistory;$("historyList").onclick=e=>{let b=e.target.closest("[data-id]"),x=b&&hist().find(y=>y.id===b.dataset.id);if(!x)return;$("niche").value=x.topic||"";$("refUrl").value=/^https?:/.test(x.source||"")?x.source:"";$("prompt").value=x.prompt||"";$("stylePrompt").value=x.stylePrompt||"";$("script").value=x.script||"";S.analysis=x.analysis||null;if(x.analysis){$("analysisRaw").value=JSON.stringify(x.analysis,null,2);$("analysisCard").classList.add("show")}$("promptCard").classList.add("show");say("Saved prompt recovered")};
$("copyBtn").onclick=async()=>{await navigator.clipboard.writeText($("prompt").value+"\n\nVISUAL STYLE:\n"+$("stylePrompt").value);$("copyBtn").textContent="Copied";setTimeout(()=>$("copyBtn").textContent="Copy prompt",1000)};
const KEY_FIELDS={gemini:"geminiKey",vidiq:"vidiqKey",revid:"revidKey",apify:"apifyKey",adsClientId:"adsClientId",adsClientSecret:"adsClientSecret",adsRefreshToken:"adsRefreshToken",adsCustomerId:"adsCustomerId",adsLoginCustomerId:"adsLoginCustomerId"};
function restoreKeys(){try{const saved=JSON.parse(localStorage.getItem(KEY_STORE)||"{}");for(const [key,id] of Object.entries(KEY_FIELDS))$(id).value=typeof saved[key]==="string"?saved[key]:"";$("keysStatus").textContent=Object.values(saved).some(x=>typeof x==="string"&&x.length)?"Saved in this profile":"Not saved"}catch{$("keysStatus").textContent="Could not read saved keys"}}
$("saveKeysBtn").onclick=()=>{try{const k=keys();localStorage.setItem(KEY_STORE,JSON.stringify(k));$("keysStatus").textContent="Keys saved in this profile";say("API keys saved locally")}catch{$("keysStatus").textContent="Could not save keys in this browser";say("Could not save API keys")}};
$("forgetBtn").onclick=()=>{for(const id of Object.values(KEY_FIELDS))$(id).value="";localStorage.removeItem(KEY_STORE);$("keysStatus").textContent="Saved keys cleared";say("Saved API keys cleared")};
restoreKeys();
document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
$("renderBtn").onclick=async()=>{let k=keys();if(!k.revid)return alert("Enter a Revid API key to render.");if(!$("prompt").value.trim())return alert("Build a prompt first.");if($("renderMode").value==="script-to-video"&&!$("script").value.trim())return alert("Enter a script or choose prompt-to-video.");let b=$("renderBtn");b.disabled=true;b.textContent="Estimating…";
try{let t=$("visualType").value,m=t==="anime"?{type:"ai-video",videoModel:"pro",mediaPreset:"ANIME"}:t==="motion-graphics"?{type:"motion-graphics",videoModel:"pro",mediaPreset:"MOTION_INSPIRATION_DARK_SAAS"}:t==="stock-video"?{type:"stock-video"}:{type:"ai-video",videoModel:"pro"},wf=$("renderMode").value,payload={workflow:wf,source:wf==="script-to-video"?{text:$("script").value}:{prompt:$("prompt").value,stylePrompt:$("stylePrompt").value,durationSeconds:Number($("duration").value)},aspectRatio:$("ratio").value,media:m,voice:{enabled:true},captions:{enabled:true},music:{enabled:false},render:{resolution:"720p",frameRate:30}},est=await api("/api/revid/estimate",{payload}),cost=est.creditsToConsume||est.credits||est.estimatedCredits||est.cost||"not returned",warning=est.warningMessage||"";if(est.isEstimationReliable===false&&!warning)warning="Revid marks this estimate as a lower bound.";if(!confirm("Estimated generation credits: "+cost+". Add Revid's 10-credit render fee per call.\n"+(est.creditsToConsumeString||"")+(warning?"\n\n"+warning:"")+"\n\nStart one render?"))return;b.textContent="Starting render…";let x=await api("/api/revid/render",{key:k.revid,payload});S.pid=x.pid||x.projectId||x.project_id;if(!S.pid)throw Error("Revid did not return a render ID.");$("renderCard").classList.add("show");$("renderStatus").textContent="Render "+S.pid+" · queued";poll()}catch(e){err(e)}finally{b.disabled=false;b.textContent="Estimate and render rough cut"}};
async function poll(){if(!S.pid)return;try{let x=await api("/api/revid/status",{key:keys().revid,pid:S.pid}),d=x.data||x,st=d.status||d.state||"rendering",u=d.videoUrl||d.video_url||d.url;$("renderStatus").textContent="Render "+S.pid+" · "+st;if(u){$("draftVideo").src=u;$("draftVideo").style.display="block";$("openDraft").href=u;$("openDraft").style.display="inline-block";say("Draft ready")}else if(st!=="failed")setTimeout(poll,9000)}catch(e){$("renderStatus").textContent=e.message}}
$("refreshBtn").onclick=poll;

/* Batch Production: separate jobs; no automatic publishing; no secret keys in exports. */
const BATCH_STORE="clipfarm-batch-v1";
let batchJobs=[],batchRunning=false,batchStop=false,batchEstimated=false;let existingProjects=[],existingSeoBusy=false;
const batchDefaults={research:null,title:"Untitled video",script:"",prompt:"",stylePrompt:"Realistic 3D cutaways, simple fifth-grade narration, large captions, 9:16 vertical.",referenceUrl:"",seoTitle:"",seoDescription:"",primaryKeyword:"",tags:[],selected:true,status:"Ready",pid:"",videoUrl:"",approved:false,credits:null,error:"",publishStatus:"",youtubeUrl:"",publishContentId:"",publishResult:null};
function batchPersist(){try{localStorage.setItem(BATCH_STORE,JSON.stringify(batchJobs))}catch(e){$("batchSummary").textContent="Could not save queue locally: "+e.message}}
function batchSafeUrl(v){try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:""}catch{return""}}
function batchRead(input){
 const a=Array.isArray(input)?input:input&&Array.isArray(input.videos)?input.videos:null;
 if(!a||!a.length||a.length>100)throw Error("Provide an array of 1–100 videos (or an object with videos array).");
 return a.map((v,i)=>{
  if(!v||typeof v!=="object"||!String(v.script||"").trim())throw Error("Video "+(i+1)+" needs a narration script.");
  const seo=v.seo&&typeof v.seo==="object"?v.seo:{},raw=seo.tags??v.tags??[];
  const tags=Array.isArray(raw)?raw.map(String):String(raw||"").split(",");
  return {...batchDefaults,title:String(v.title||seo.title||"Video "+(i+1)).slice(0,180),script:String(v.script),
    prompt:String(v.prompt||v.visualPrompt||""),stylePrompt:String(v.stylePrompt||batchDefaults.stylePrompt),
    referenceUrl:batchSafeUrl(v.referenceUrl||v.reference||""),research:v.research&&typeof v.research==="object"?v.research:null,
    seoTitle:String(seo.title||v.seoTitle||v.youtubeTitle||v.title||"").slice(0,100),
    seoDescription:String(seo.description||v.seoDescription||v.description||"").slice(0,5000),
    primaryKeyword:String(seo.primaryKeyword||v.primaryKeyword||"").slice(0,200),
    tags:tags.map(x=>x.trim()).filter(Boolean).slice(0,50)};
 });
}
function batchMedia(){let t=$("batchStyle").value;return t==="anime"?{type:"ai-video",videoModel:"pro",mediaPreset:"ANIME"}:t==="motion-graphics"?{type:"motion-graphics",videoModel:"pro",mediaPreset:"MOTION_INSPIRATION_DARK_SAAS"}:t==="stock-video"?{type:"stock-video"}:{type:"ai-video",videoModel:"pro"}}
function batchPayload(v){const mode=$("batchMode").value,source=mode==="script-to-video"?{text:v.script}:{prompt:"Create an original educational video. Try to use this narration verbatim (not guaranteed): "+v.script+"\n\nVISUAL INSTRUCTIONS: "+v.prompt,stylePrompt:v.stylePrompt,durationSeconds:40};return {workflow:mode,source,aspectRatio:"9:16",media:batchMedia(),voice:{enabled:true},captions:{enabled:true},music:{enabled:false},render:{resolution:$("batchResolution").value,frameRate:30}}}
function batchDraw(){
 const active=batchJobs.filter(j=>j.selected),total=active.reduce((n,j)=>n+(Number(j.credits)||0),0);
 $("batchStart").disabled=batchRunning||!active.length||!batchEstimated||active.some(j=>j.credits===null||j.status!=="Ready");
 $("batchStop").disabled=!batchRunning;
 $("batchSummary").textContent=batchJobs.length+" videos imported · "+active.length+" selected · "+batchJobs.filter(j=>j.status==="Complete").length+" complete · "+batchJobs.filter(j=>j.approved).length+" approved · "+(batchEstimated?"Selected estimated credits: "+total:"Estimate credits before rendering")+(batchRunning?" · "+batchJobs.filter(j=>["Submitting","Rendering"].includes(j.status)).length+" active":"");
 $("batchList").innerHTML=batchJobs.map((v,i)=>{
  const tags=Array.isArray(v.tags)?v.tags:[],published=["Submitted","Published","Processing"].includes(v.publishStatus);
  return '<div class="variant"><div class="varianttop"><label><input type="checkbox" data-bsel="'+i+'" '+(v.selected?"checked":"")+' '+(batchRunning||["Rendering","Complete"].includes(v.status)?"disabled":"")+'> <strong>'+esc(v.title)+'</strong></label><span class="badge">'+esc(v.status)+'</span></div>'+
  '<p>Video '+(i+1)+' · Estimated credits: '+(v.credits===null?"not estimated":v.credits)+' · '+esc(v.error||"")+'</p>'+
  '<p class="tiny">YouTube title: '+esc(v.seoTitle||v.title)+' · Keyword: '+esc(v.primaryKeyword||"Not set")+' · Tags: '+tags.length+' · Publish: '+esc(v.publishStatus||"Not submitted")+'</p>'+(v.research?'<p class="tiny">Research: '+fmt(v.research.views)+' reference views · '+esc(v.research.outlierScore)+'× breakout · title score '+esc(v.research.titleScore)+'/100</p>':'')+
  (v.referenceUrl?'<a href="'+esc(v.referenceUrl)+'" target="_blank" rel="noreferrer">Reference</a> · ':'')+
  '<button class="btn small ghost" data-bedit="'+i+'">Edit script</button> <button class="btn small ghost" data-bseo="'+i+'">Edit SEO</button> <button class="btn small ghost" data-bcopy="'+i+'">Copy YouTube metadata</button> '+
  (v.videoUrl?'<a href="'+esc(v.videoUrl)+'" target="_blank" rel="noreferrer">Preview / download MP4</a> <label style="margin-left:10px"><input type="checkbox" data-bapprove="'+i+'" '+(v.approved?"checked":"")+'> Approved</label> ':'')+
  (v.videoUrl&&v.approved?'<button class="btn small primary" data-bpublish="'+i+'" '+(published||v.publishStatus==="Submitting"?"disabled":"")+'>Publish to YouTube</button>':'')+
  (v.publishContentId?' <button class="btn small ghost" data-brefresh="'+i+'">Check YouTube status</button>':'')+(v.youtubeUrl?' <a href="'+esc(v.youtubeUrl)+'" target="_blank" rel="noreferrer">YouTube link</a>':'')+
  '</div>';
 }).join("");
}
function batchInvalidate(){batchEstimated=false;for(const j of batchJobs)if(!["Complete","Rendering"].includes(j.status))j.credits=null;batchPersist();batchDraw()}
$("batchFile").onchange=async e=>{try{$("batchJson").value=await e.target.files[0].text()}catch(err){alert(err.message)}};
$("batchImport").onclick=()=>{if(batchRunning)return;try{batchJobs=batchRead(JSON.parse($("batchJson").value));batchInvalidate();say("Batch imported — estimate credits before rendering")}catch(e){alert("Import error: "+e.message)}};
$("batchTemplate").onclick=()=>{const x=[{title:"How Elevators Stay Safe",script:"What happens if an elevator cable breaks? Modern elevators have several safety systems...",prompt:"Show realistic 3D elevator cutaway with safety ropes and brakes.",stylePrompt:"9:16 realistic 3D animation, fifth-grade explanation, large captions.",referenceUrl:"",seo:{title:"How Elevators Keep You Safe",description:"Learn how elevator safety systems work.",primaryKeyword:"elevator safety systems",tags:["elevator safety","engineering","how elevators work"]}}];batchDownload("clipfarm-batch-example.json",x)};
function batchDownload(filename,obj){const blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
$("batchExport").onclick=()=>batchDownload("clipfarm-batch-status.json",batchJobs);
$("batchList").onchange=e=>{let i=e.target.dataset.bsel;if(i!==undefined){batchJobs[+i].selected=e.target.checked;batchInvalidate()}i=e.target.dataset.bapprove;if(i!==undefined){batchJobs[+i].approved=e.target.checked;batchPersist();batchDraw()}};
$("batchList").onclick=async e=>{
 const p=e.target.dataset.bpublish,x=e.target.dataset.bseo,i=e.target.dataset.bedit,copy=e.target.dataset.bcopy,refresh=e.target.dataset.brefresh;
 if(copy!==undefined){const j=batchJobs[Number(copy)];try{await navigator.clipboard.writeText((j.seoTitle||j.title)+"\n\n"+j.seoDescription+"\n\nTAGS FOR YOUTUBE STUDIO: "+(j.tags||[]).join(", "));say("YouTube title, description and tags copied")}catch(e){alert(e.message)}return}
 if(refresh!==undefined){await batchPublishStatus(Number(refresh));return}
 if(p!==undefined){await publishBatchVideo(+p);return}
 if(x!==undefined){
  if(batchRunning)return alert("Stop the batch before editing.");
  const j=batchJobs[+x],title=prompt("YouTube title (max 100 characters)",j.seoTitle||j.title);if(title===null)return;
  const description=prompt("YouTube description",j.seoDescription);if(description===null)return;
  const keyword=prompt("Primary researched keyword",j.primaryKeyword);if(keyword===null)return;
  const tags=prompt("Tags (comma-separated)",(j.tags||[]).join(", "));if(tags===null)return;
  j.seoTitle=title.trim().slice(0,100);j.seoDescription=description.slice(0,5000);j.primaryKeyword=keyword.trim();
  j.tags=tags.split(",").map(x=>x.trim()).filter(Boolean).slice(0,50);batchPersist();batchDraw();return;
 }
 if(i===undefined)return;const j=batchJobs[+i];if(batchRunning)return alert("Stop the batch before editing.");
 const next=prompt("Edit narration for "+j.title,j.script);if(next===null)return;if(!next.trim())return alert("Narration cannot be blank.");
 j.script=next;j.status="Ready";j.pid="";j.videoUrl="";j.approved=false;j.publishStatus="";j.youtubeUrl="";batchInvalidate();
};

function existingProjectsNormalize(raw){
 const root=raw?.data??raw;
 const candidates=Array.isArray(root)?root:(root?.projects||root?.items||root?.results||root?.data?.projects||root?.data?.items||[]);
 if(!Array.isArray(candidates))throw Error("Revid returned an unfamiliar projects format; no changes were made.");
 return candidates.map(p=>({
  pid:String(p.pid||p.projectId||p.project_id||p.id||""),
  name:String(p.name||p.title||p.projectName||p.project_title||p.metadata?.title||"Untitled Revid project"),
  status:String(p.status||p.state||p.renderStatus||"").toLowerCase(),
  videoUrl:batchSafeUrl(p.videoUrl||p.video_url||p.mp4Url||p.exportUrl||p.url||""),
  original:p,selected:true,sourceText:String(p.script||p.source?.text||p.source?.prompt||p.prompt||p.description||p.metadata?.description||"").slice(0,3500)
 })).filter(p=>p.pid);
}
function existingDrawProjects(){
 const choices=PREPARED_FIVE.map((p,i)=>'<option value="'+i+'">'+esc(p.seo.title)+'</option>').join("");
 $("existingProjects").innerHTML=existingProjects.map((p,i)=>'<div class="variant"><div class="varianttop"><label><input type="checkbox" data-existing-select="'+i+'" '+(p.selected?"checked":"")+'> <strong>'+esc(p.name)+'</strong></label><span class="badge">'+esc(p.status||"Status unknown")+'</span></div>'+
 '<p class="tiny">Revid project: '+esc(p.pid)+(p.sourceText?' · Source content available':' · Title-only SEO needs review')+'</p>'+
 (p.videoUrl?'<a href="'+esc(p.videoUrl)+'" target="_blank" rel="noreferrer">Preview video</a>':'')+
 '<div class="field"><label for="existingMatch'+i+'">Or match an older researched topic</label><select id="existingMatch'+i+'" class="input"><option value="">Select one of our original five topics</option>'+choices+'</select></div>'+
 '<div class="actions"><button class="btn small ghost" data-existing-match="'+i+'">Attach older SEO package</button></div></div>').join("")||'<span class="tiny">No existing Revid projects found.</span>';
}
$("existingProjects").onchange=e=>{const i=e.target.dataset.existingSelect;if(i===undefined)return;existingProjects[Number(i)].selected=e.target.checked;const count=existingProjects.filter(p=>p.selected).length;$("existingStatus").textContent=count+" projects selected for SEO preparation."};
function seoBundle(){
 return {format:"clipfarm-seo-v1",createdAt:new Date().toISOString(),videos:batchJobs.filter(j=>j.pid&&j.seoTitle).map(j=>({projectId:j.pid,revidTitle:j.title,videoUrl:j.videoUrl||"",seo:{title:j.seoTitle,description:j.seoDescription,primaryKeyword:j.primaryKeyword,tags:j.tags},research:j.research||null}))};
}
$("existingSeoExport").onclick=()=>{const bundle=seoBundle();if(!bundle.videos.length)return alert("No matched Revid SEO records to export.");batchDownload("clipfarm-youtube-seo-package.json",bundle)};
function seoVerify(input){
 if(!input||input.format!=="clipfarm-seo-v1"||!Array.isArray(input.videos))throw Error("Not a Clip Farm SEO v1 package.");
 if(input.videos.length>100||!input.videos.length)throw Error("SEO package must include 1–100 video records.");
 const used=new Set();
 return input.videos.map((v,i)=>{
  const pid=String(v.projectId||"").trim(),seo=v.seo||{};
  if(!pid||used.has(pid))throw Error("Missing or duplicate Revid project ID at record "+(i+1));used.add(pid);
  const title=String(seo.title||"").trim(),description=String(seo.description||"").trim(),tags=seo.tags;
  if(!title||title.length>100||!description||description.length>5000||!Array.isArray(tags))throw Error("Invalid SEO fields for "+pid+" (title, description and tags are required).");
  return {pid,title,description,primaryKeyword:String(seo.primaryKeyword||"").slice(0,200),tags:tags.map(x=>String(x).trim()).filter(Boolean).slice(0,50),research:v.research||null,revidTitle:String(v.revidTitle||"")};
 });
}
function seoAttach(records){
 if(batchRunning||batchJobs.some(j=>["Rendering","Submitting"].includes(j.status)))throw Error("Active rendering or publishing in progress. Finish it before importing.");
 if(!existingProjects.length)throw Error("Load your existing Revid videos before importing metadata. This prevents mismatched project IDs.");
 const projectById=new Map(existingProjects.map(p=>[p.pid,p])),unknown=records.filter(r=>!projectById.has(r.pid));
 if(unknown.length)throw Error(unknown.length+" project IDs do not exist in the loaded Revid account: "+unknown.slice(0,3).map(x=>x.pid).join(", ")+". Nothing imported.");
 const statuses=new Map(batchJobs.filter(j=>j.pid).map(j=>[j.pid,j]));const target=new Map(statuses);
 for(const r of records){
  const p=projectById.get(r.pid),prior=statuses.get(r.pid);
  if(prior?.publishStatus==="Published")throw Error("Project "+r.pid+" is already marked Published. No changes imported.");
  const item={...batchDefaults,...(prior||{}),title:p.name,seoTitle:r.title,seoDescription:r.description,primaryKeyword:r.primaryKeyword,tags:r.tags,research:r.research||prior?.research||null,
   pid:p.pid,videoUrl:p.videoUrl||prior?.videoUrl||"",status:p.videoUrl||prior?.videoUrl?"Complete":"Needs export",selected:false,approved:false};
  target.set(r.pid,item);
 }
 batchJobs=[...target.values()];batchPersist();batchDraw();return records.length;
}
$("existingSeoImport").onchange=async e=>{
 try{
  const file=e.target.files?.[0];if(!file)return;
  const records=seoVerify(JSON.parse(await file.text()));
  if(!confirm("Import "+records.length+" SEO packages and attach them to matching Revid project IDs? Existing publishing status will be preserved, and approvals reset."))return;
  const count=seoAttach(records);$("existingStatus").textContent=count+" SEO records attached by exact Revid project ID. Review before publishing.";say("SEO package imported successfully");
 }catch(err){alert("SEO package import failed: "+err.message)}finally{e.target.value=""}
};

$("existingLoadSeo").onclick=()=>{
 if(batchJobs.length&&!confirm("Replace the current queue with our five researched SEO packages? This discards existing video matches and publication status saved in Clip Farm."))return;
 if(batchJobs.some(j=>j.status==="Rendering"||j.status==="Submitting"))return alert("Existing renders are active. Finish them before changing this queue.");
 batchJobs=batchRead(PREPARED_FIVE).map((v,i)=>({...v,research:PREPARED_FIVE[i].research,selected:false}));
 batchInvalidate();$("existingStatus").textContent="Five original SEO packages loaded. No Revid rendering started. Choose an existing Revid video and match it.";
};
$("existingGenerateSeo").onclick=async()=>{
 if(existingSeoBusy)return;
 const k=keys(),projects=existingProjects.filter(p=>p.selected);
 if(!projects.length)return alert("Load your Revid projects and select at least one video.");
 if(!k.gemini||!k.vidiq)return alert("Save both Gemini and vidIQ keys. vidIQ performs keyword research; Gemini writes final metadata.");
 if(projects.some(p=>!p.name||p.name==="Untitled Revid project"))return alert("Some selected projects have no useful title. Rename them in Revid, reload, then generate SEO.");
 if(!confirm("Research SEO for "+projects.length+" Revid videos? This uses vidIQ research calls and Gemini API credits. No videos will render or publish. Continue?"))return;
 existingSeoBusy=true;const btn=$("existingGenerateSeo");btn.disabled=true;
 let completed=0,errors=[];const records=[];
 try{
  for(const p of projects){
   $("existingStatus").textContent="SEO "+(completed+errors.length+1)+"/"+projects.length+": "+p.name+"…";
   try{
    const d=await api("/api/seo/project",{geminiKey:k.gemini,vidiqKey:k.vidiq,projectId:p.pid,projectTitle:p.name,projectText:p.sourceText});
    const r=seoVerify({format:"clipfarm-seo-v1",videos:[d]})[0];records.push(r);completed++;
    seoAttach([r]); // Preserve each successful project if a later API call fails
   }catch(e){errors.push(p.name+": "+e.message)}
  }
  $("existingStatus").textContent=completed+" of "+projects.length+" videos have researched SEO and are linked by project ID."+ (errors.length?" "+errors.length+" need attention.":"")+" No renders or publishing started.";
  if(errors.length)alert("SEO failed for "+errors.length+" videos:\n"+errors.slice(0,8).join("\n")+"\nYou can retry selected projects or import an SEO JSON package.");
  if(completed)batchDownload("clipfarm-revid-seo-"+completed+"-videos.json",{format:"clipfarm-seo-v1",createdAt:new Date().toISOString(),videos:records.map(r=>({projectId:r.pid,revidTitle:r.revidTitle,seo:{title:r.title,description:r.description,primaryKeyword:r.primaryKeyword,tags:r.tags},research:r.research}))});
 }finally{existingSeoBusy=false;btn.disabled=false}
};
$("existingLoadProjects").onclick=async()=>{
 const key=keys().revid;if(!key)return alert("Save a Revid API key first.");
 const b=$("existingLoadProjects");b.disabled=true;$("existingStatus").textContent="Loading existing projects from your Revid account…";
 try{const result=await api("/api/revid/projects",{key});existingProjects=existingProjectsNormalize(result);existingDrawProjects();$("existingStatus").textContent=existingProjects.length+" existing Revid projects found. Match each to the correct SEO package. Nothing will be published until you approve."}
 catch(e){$("existingStatus").textContent=e.message;alert("Could not load Revid projects: "+e.message)}
 finally{b.disabled=false}
};
$("existingProjects").onclick=async e=>{
 const button=e.target.closest("[data-existing-match]");if(!button)return;
 const p=existingProjects[Number(button.dataset.existingMatch)],select=$("existingMatch"+button.dataset.existingMatch);
 const index=Number(select?.value);if(!select?.value||!Number.isInteger(index)||!PREPARED_FIVE[index])return alert("Choose the correct SEO topic for this Revid video.");
 if(!keys().revid)return alert("Save your Revid API key first.");
 if(batchRunning)return alert("Finish the active batch before attaching an existing video.");
 if(batchJobs.length&&!batchJobs.some(j=>j.research?.source==="vidIQ")&& !confirm("Replace the current batch with our five researched SEO packages?"))return;
 const selected=PREPARED_FIVE[index];
 if(!confirm('Match Revid video "'+p.name+'" with the SEO package "'+selected.seo.title+'"? No new video will be rendered.'))return;
 button.disabled=true;$("existingStatus").textContent="Verifying the existing Revid video has finished exporting…";
 try{
  const x=await api("/api/revid/status",{key:keys().revid,pid:p.pid}),d=x.data||x;
  const status=String(d.status||d.state||p.status||"").toLowerCase();
  const url=batchSafeUrl(d.videoUrl||d.video_url||d.url||p.videoUrl);
  if(!url||["failed","error","rendering","queued","processing","pending"].includes(status))throw Error("This Revid project doesn't yet have a finished video URL. Finish/export it in Revid and reload projects.");
  if(batchJobs.length&&!batchJobs.some(j=>j.research?.source==="vidIQ"))batchJobs=[];
  const existing=batchJobs.find(j=>j.research?.source==="vidIQ"&&j.seoTitle===selected.seo.title);
  const already=batchJobs.find(j=>j.pid===p.pid&&j!==existing);
  if(already)throw Error("This Revid video is already attached to another SEO package.");
  if(existing?.pid&&existing.pid!==p.pid&&!confirm("Replace the video currently linked to this SEO package?"))return;
  const item=batchRead([selected])[0];
  Object.assign(item,{research:selected.research,selected:false,status:"Complete",pid:p.pid,videoUrl:url,credits:0,approved:false,publishStatus:"",youtubeUrl:"",error:""});
  if(existing){const at=batchJobs.indexOf(existing);batchJobs[at]=item}else batchJobs.push(item);
  batchEstimated=false;batchPersist();batchDraw();
  $("existingStatus").textContent="Linked "+p.name+" to its researched YouTube title, description and tags. Preview and approve to publish. No render credits used.";
  say("Existing Revid video matched to researched SEO.");
 }catch(err){$("existingStatus").textContent=err.message;alert(err.message)}finally{button.disabled=false}
};

$("batchLoadAccounts").onclick=async()=>{
 const key=keys().revid;if(!key)return alert("Enter your Revid API key first.");
 try{
  const x=await api("/api/revid/social-accounts",{key}),raw=x.accounts||x.socialAccounts||x.data?.accounts||x.data?.socialAccounts||x.data||[];
  const sel=$("batchYoutubeAccount");sel.innerHTML='<option value="">Choose YouTube account</option>';
  for(const a of (Array.isArray(raw)?raw:[])){
   if(!String(a.platform||a.type||a.network||a.provider||"").toLowerCase().includes("youtube"))continue;
   const id=String(a.id||a.accountId||a.socialAccountId||"");if(!id)continue;
   if(a.tokenInvalid)continue;const name=String(a.label||a.name||a.channelName||a.username||a.handle||id),opt=document.createElement("option");
   opt.value=id;opt.textContent=name;opt.dataset.channelName=name;sel.appendChild(opt);
  }
  if(sel.options.length===1)alert("No connected YouTube accounts found. Connect your channel in Revid Settings → Integrations.");
 }catch(err){alert("Could not load YouTube accounts: "+err.message)}
};
async function batchPublishStatus(index){
 const j=batchJobs[index];if(!j?.publishContentId)return alert("No Revid publishing ID for this video.");
 try{
  const x=await api("/api/revid/publish-status",{key:keys().revid,contentId:j.publishContentId});
  const post=Array.isArray(x.platforms)?x.platforms.find(p=>p.platform==="youtube"):null;
  const status=String(post?.status||x.status||"unknown").toLowerCase();
  if(status==="published"){j.publishStatus="Published";j.youtubeUrl=batchSafeUrl(post?.postUrl||"");j.error=""}
  else if(status==="failed"){j.publishStatus="Failed";j.error=String(post?.error?.message||"YouTube publishing failed.")}
  else j.publishStatus="Processing";
  batchPersist();batchDraw();
  alert(j.publishStatus==="Published"?"YouTube has confirmed the video is published.":j.publishStatus==="Failed"?j.error:"Still processing at Revid. Check again shortly.");
 }catch(e){alert("YouTube status check failed: "+e.message)}
}
async function publishBatchVideo(index){
 const j=batchJobs[index],sel=$("batchYoutubeAccount"),account=sel.selectedOptions[0];
 if(!j||j.status!=="Complete"||!j.videoUrl||!j.pid)return alert("Video must finish rendering first.");
 if(!j.approved)return alert("Review and approve the video first.");
 if(!sel.value)return alert("Choose a connected YouTube account.");
 if(j.publishStatus==="Submitted"||j.publishStatus==="Submitting")return alert("Already submitted. Check Revid for status.");
 const title=(j.seoTitle||j.title).trim(),description=j.seoDescription.trim();
 if(!title||!description)return alert("Enter a YouTube title and description in Edit SEO.");
 if(!confirm('Publish "'+title+'" to YouTube channel "'+account.textContent+'"?'))return;
 j.publishStatus="Submitting";batchPersist();batchDraw();
 try{
  const result=await api("/api/revid/publish-now",{key:keys().revid,videoUrl:j.videoUrl,pid:j.pid,
   accountId:sel.value,title,description});
  const contentId=String(result.contentId||result.data?.contentId||"");
  if(!contentId)throw Error("Revid returned no publishing ID. The request may already be processing; verify in Revid before retrying.");
  j.publishResult=result;j.publishContentId=contentId;j.publishStatus="Submitted";
  alert("Revid accepted the YouTube upload. Check the YouTube status to confirm it went live. Tags can be copied for YouTube Studio.");
 }catch(err){j.publishStatus="Needs review";j.error="Publishing: "+err.message;alert(j.error)}
 batchPersist();batchDraw();
}
$("batchMode").onchange=batchInvalidate;$("batchStyle").onchange=batchInvalidate;$("batchResolution").onchange=batchInvalidate;
$("batchEstimate").onclick=async()=>{if(batchRunning)return;if(!batchJobs.some(j=>j.selected))return alert("Select at least one video.");const b=$("batchEstimate");b.disabled=true;try{for(let i=0;i<batchJobs.length;i++){const j=batchJobs[i];if(!j.selected||["Complete","Rendering"].includes(j.status))continue;$("batchSummary").textContent="Estimating "+(i+1)+"/"+batchJobs.length+": "+j.title;const x=await api("/api/revid/estimate",{payload:batchPayload(j)});let n=Number(x.creditsToConsume??x.credits??x.estimatedCredits??x.cost);if(!Number.isFinite(n))throw Error("Revid returned no usable credit estimate for "+j.title);j.credits=n+10}batchEstimated=true;batchPersist();batchDraw()}catch(e){batchEstimated=false;batchDraw();alert("Estimation stopped: "+e.message)}finally{b.disabled=false}};
$("batchStop").onclick=()=>{batchStop=true;say("No new renders will start; active Revid jobs continue and Clip Farm will keep checking them")};
async function batchStatus(j){
 for(let attempts=0;attempts<240;attempts++){
  const x=await api("/api/revid/status",{key:keys().revid,pid:j.pid}),d=x.data||x,st=String(d.status||d.state||"").toLowerCase(),url=d.videoUrl||d.video_url||d.url||"";
  if(url){const safe=batchSafeUrl(url);if(!safe)throw Error("Revid returned an invalid video link; check Revid before retrying.");j.status="Complete";j.videoUrl=safe;return}
  if(["ready","completed","complete","success"].includes(st)){j.status="Needs export";j.error="Revid reports ready, but no video URL was returned. Open Revid to export the MP4.";return}
  if(["failed","error","cancelled","canceled"].includes(st))throw Error("Revid render "+st);
  await new Promise(r=>setTimeout(r,9000));
 }
 throw Error("Status timed out. Verify the existing Revid job before re-submitting.");
}
$("batchStart").onclick=async()=>{
 const selected=batchJobs.filter(j=>j.selected&&j.status==="Ready"),sum=selected.reduce((a,j)=>a+Number(j.credits||0),0);
 if(!selected.length||!batchEstimated)return;
 if(!keys().revid)return alert("Enter your Revid key in API connections.");
 const concurrency=Math.min(5,Math.max(1,Number($("batchConcurrency").value)||1));
 if(!confirm("Submit "+selected.length+" separate Revid render jobs with up to "+concurrency+" running at once?\nEstimated total: "+sum+" credits, including estimated render fees. Actual billing may vary. Keep Clip Farm open. Stop prevents NEW submissions but does not cancel charged Revid jobs. No videos are published automatically."))return;
 batchRunning=true;batchStop=false;batchDraw();let next=0;
 const worker=async()=>{
  while(!batchStop&&next<selected.length){
   const j=selected[next++];j.status="Submitting";j.error="";batchPersist();batchDraw();
   try{
    const x=await api("/api/revid/render",{key:keys().revid,payload:batchPayload(j)});
    j.pid=x.pid||x.projectId||x.id||"";
    if(!j.pid)throw Error("Revid response had no job ID; check Revid before retrying.");
    j.status="Rendering";batchPersist();batchDraw();
    await batchStatus(j);
   }catch(e){
    // Even when no PID was returned, submission may have reached Revid.
    // Never offer an automatic retry that might bill the user twice.
    j.status="Needs review";j.error=String(e.message||e);
    if(/429|rate.limit|too.many.requests/i.test(j.error))batchStop=true;
   }
   batchPersist();batchDraw();
  }
 };
 await Promise.all(Array.from({length:Math.min(concurrency,selected.length)},()=>worker()));
 batchRunning=false;batchDraw();say(batchStop?"Batch paused. Active jobs were monitored; inspect any Needs review items.":"Batch completed. Review generated videos before approving.");
};

const PIPELINE_STORE="clipfarm-research-drafts-v1";let pipelineKeywords=[];
let pipelineRefs=[],pipelineDrafts=[];
const PREPARED_FIVE=[{"title":"Why This Balcony Doesn't Fall Off the Building","script":"Why doesn't this balcony snap off the building? It's a cantilever, so there's no column holding up its outside edge. Instead, the balcony carries its weight back into the building. The biggest bending forces concentrate near that connection. In reinforced concrete designs, steel near the top resists the pulling force while concrete handles compression. If the steel is missing or poorly placed, that connection can crack. The hidden support is what makes the floating balcony possible.","prompt":"Original photorealistic 3D cantilever balcony cutaway: show no outer column, fixed-end bending, top tension reinforcement anchored into building and compression below. Clear mechanical labels and animated loads.","referenceUrl":"https://www.youtube.com/watch?v=vzZWyquMpI8","seo":{"title":"Why This Balcony Doesn't Fall Off the Building","description":"A floating balcony is a cantilever. See how correctly anchored reinforcement and the building structure carry its load. #Engineering #Construction #Shorts","primaryKeyword":"cantilever","tags":["cantilever","cantilever balcony","structural engineering","balcony design","reinforced concrete","engineering explained","building design"]},"research":{"source":"vidIQ","views":8800000,"outlierScore":288,"vph":437.7,"titleScore":96},"stylePrompt":"9:16 vertical, 35–45 seconds, photorealistic original engineering 3D cutaways, strong 2-second hook, readable captions, clean narration, no copied footage or logos."},{"title":"How a Skyscraper Is Built From the Inside Out","script":"How do you build a skyscraper without the entire structure collapsing halfway through? First, engineers create a foundation that transfers enormous loads into the ground. Then the core and structural frame rise in carefully planned stages. Floors tie the structure together, while cranes lift steel and concrete materials higher as the tower grows. The core helps resist side forces from wind. Every new floor depends on the supports below it. A skyscraper isn't one giant pour. It's a carefully sequenced system.","prompt":"3D cutaway of modern skyscraper construction stages showing foundation, reinforced core, columns, floor plates, cranes, temporary formwork and wind-load arrows. Original educational vertical animation.","referenceUrl":"https://www.youtube.com/watch?v=MtMV-i28meI","seo":{"title":"How a Skyscraper Is Built From the Inside Out","description":"A 3D cutaway explains the construction sequence behind modern skyscrapers—from foundation and structural core to floors and wind resistance. #Skyscraper #Engineering #Shorts","primaryKeyword":"skyscraper construction","tags":["skyscraper construction","how skyscrapers are built","building construction","structural engineering","construction techniques","engineering shorts"]},"research":{"source":"vidIQ","views":627000,"outlierScore":17,"vph":3200,"titleScore":90},"stylePrompt":"9:16 vertical, 35–45 seconds, photorealistic original engineering 3D cutaways, strong 2-second hook, readable captions, clean narration, no copied footage or logos."},{"title":"How Venice's Buildings Stand on Wooden Piles","script":"Venice looks like a city floating on water, but thousands of old buildings stand on foundations built in muddy ground. Builders drove closely spaced timber piles into the lagoon soil and constructed platforms above them. Here's the surprising part: wood kept permanently underwater can decay much more slowly because there's very little oxygen for fungi. It doesn't turn to stone, and the piles aren't indestructible. But with the right conditions, wood foundations can support buildings for centuries. The engineering is hidden beneath the canals.","prompt":"3D cinematic Venice canal cutaway showing closely spaced submerged timber foundation piles embedded in muddy soil supporting masonry above. Show submerged low-oxygen condition, structural load paths; no petrification myth.","referenceUrl":"https://www.youtube.com/watch?v=3c-bC4PswlU","seo":{"title":"How Venice's Buildings Stand on Wooden Piles","description":"How was Venice built on muddy islands? Explore the timber pile foundations beneath historic buildings and why waterlogged wood can survive for centuries. #Venice #Engineering #Shorts","primaryKeyword":"how venice was built","tags":["how Venice was built","Venice foundations","wooden piles","ancient engineering","Venice canals","how buildings stand","engineering explained"]},"research":{"source":"vidIQ","views":9800000,"outlierScore":0.6,"vph":122.7,"titleScore":88},"stylePrompt":"9:16 vertical, 35–45 seconds, photorealistic original engineering 3D cutaways, strong 2-second hook, readable captions, clean narration, no copied footage or logos."},{"title":"Why the Burj Khalifa Is Designed to Move","script":"The Burj Khalifa is incredibly tall, but engineers didn't design it to be perfectly motionless. Wind pushes on skyscrapers, creating sideways forces and vibration. The Burj Khalifa's Y-shaped buttressed core gives the tower stability, while its changing setbacks help prevent the wind from pushing rhythmically on one shape all the way up. In wind tunnels, engineers tested ways to reduce movement. The secret isn't making the tower totally rigid. It's shaping the structure so it handles wind safely.","prompt":"Original Burj Khalifa 3D wind-tunnel structural explanation: overhead Y-shaped buttressed core, tower setbacks, vortex shedding, modest realistic sway and labeled load paths. No exaggerated bending.","referenceUrl":"https://www.youtube.com/watch?v=-_VKn52jFJY","seo":{"title":"Why the Burj Khalifa Is Designed to Move","description":"Why does the Burj Khalifa move in the wind? Its Y-shaped buttressed core and changing setbacks reduce wind forces and vibration. #BurjKhalifa #Engineering #Shorts","primaryKeyword":"burj khalifa","tags":["Burj Khalifa","Burj Khalifa engineering","skyscraper sway","buttressed core","wind engineering","structural engineering","Dubai architecture"]},"research":{"source":"vidIQ","views":560300,"outlierScore":61,"vph":350.5,"titleScore":87},"stylePrompt":"9:16 vertical, 35–45 seconds, photorealistic original engineering 3D cutaways, strong 2-second hook, readable captions, clean narration, no copied footage or logos."},{"title":"How Engineers Dig Below a Building Without Collapse","script":"What happens when construction crews need to dig deeper than the foundation of a building next door? Just scooping out the dirt could remove the support holding that building up. Engineers may first install a retaining system to hold back the soil, then use shoring, bracing, or underpinning to protect the neighboring foundation. Excavation happens in planned stages, with movement carefully monitored. The important part isn't how fast they dig. It's making sure the building above never loses the support it needs.","prompt":"Original accurate 3D excavation cutaway beside an existing building showing risk to nearby footings, designed retaining wall, shoring, struts, underpinning, movement monitoring and safe staged excavation.","referenceUrl":"https://www.youtube.com/watch?v=qAQx6dXrnx8","seo":{"title":"How Engineers Dig Below a Building Without Collapse","description":"How can engineers excavate below a neighboring building's foundation? See how shoring, bracing and underpinning protect surrounding structures. #Excavation #Engineering #Shorts","primaryKeyword":"excavation","tags":["excavation","underpinning","shoring","foundation engineering","construction safety","retaining wall","structural engineering"]},"research":{"source":"vidIQ","views":120600,"outlierScore":95,"vph":121.9,"titleScore":84},"stylePrompt":"9:16 vertical, 35–45 seconds, photorealistic original engineering 3D cutaways, strong 2-second hook, readable captions, clean narration, no copied footage or logos."}];
function pipelineSave(){try{localStorage.setItem(PIPELINE_STORE,JSON.stringify({refs:pipelineRefs,keywords:pipelineKeywords,drafts:pipelineDrafts,topic:$("pipelineTopic").value,direction:$("pipelineDirection").value}))}catch(e){}}
$("pipelineLoadFive").onclick=()=>{if(pipelineDrafts.length&&!confirm("Replace the current drafts with the five videos already researched?"))return;pipelineDrafts=batchRead(PREPARED_FIVE).map((v,i)=>({...v,seo:{title:v.seoTitle,description:v.seoDescription,primaryKeyword:v.primaryKeyword,tags:v.tags},research:PREPARED_FIVE[i].research,selected:true}));pipelineRefs=PREPARED_FIVE.map(v=>({url:v.referenceUrl,summary:v.title,platform:"youtube",engagement:{views:v.research.views},outlierScore:v.research.outlierScore,vph:v.research.vph,selected:true}));pipelineKeywords=PREPARED_FIVE.map(v=>({keyword:v.seo.primaryKeyword}));pipelineSave();pipelineDraw();$("pipelineStatus").textContent="Five researched packages loaded with their existing scripts, SEO and vidIQ results. No Gemini regeneration or Revid credits used. Review and send to render queue.";say("Five previously researched packages loaded");};
function pipelineRefUrl(v){const u=String(v.url||v.postUrl||v.post_url||"");return batchSafeUrl(u)}
function pipelineScore(v){const m=v.engagement||{};const views=Number(m.views??v.views)||0,likes=Number(m.likes??v.likes)||0,outlier=Number(v.outlierScore)||0;return outlier*1000+(views?Math.log10(views+1)*100+100*likes/Math.max(views,1):0)}
function pipelineDraw(){
 $("pipelineGenerate").disabled=!pipelineRefs.some(v=>v.selected);
 $("pipelineQueue").disabled=!pipelineDrafts.some(v=>v.selected);
 $("pipelineRefs").innerHTML=pipelineRefs.map((v,i)=>'<div class="variant"><div class="varianttop"><label><input type="checkbox" data-pref="'+i+'" '+(v.selected?"checked":"")+'> <strong>'+esc(String(v.summary||v.description||v.hook||"Reference video").slice(0,170))+'</strong></label><span class="badge">'+esc(v.platform||"video")+'</span></div><p class="tiny">'+fmtMetric(v.engagement?.views??v.views)+' views · '+fmtMetric(v.engagement?.likes??v.likes)+' likes · '+esc(v.author?.nickname||v.author?.username||"")+'</p>'+(pipelineRefUrl(v)?'<a href="'+esc(pipelineRefUrl(v))+'" target="_blank" rel="noreferrer">Open original reference</a>':'')+'</div>').join("")||'<span class="tiny">No references. Search to begin.</span>';
 $("pipelineDrafts").innerHTML=pipelineDrafts.map((v,i)=>'<div class="variant"><div class="varianttop"><label><input type="checkbox" data-pdraft="'+i+'" '+(v.selected?"checked":"")+'> <strong>'+esc(v.seo?.title||v.title)+'</strong></label></div><p class="tiny">Keyword: '+esc(v.seo?.primaryKeyword||"—")+' · '+(v.seo?.tags?.length||0)+' tags</p><p>'+esc(v.script.slice(0,270))+(v.script.length>270?"…":"")+'</p><div class="actions"><button class="btn small ghost" data-pedit="'+i+'">Edit script / visuals / SEO</button>'+(v.referenceUrl?'<a class="btn small ghost" href="'+esc(v.referenceUrl)+'" target="_blank" rel="noreferrer">Reference</a>':'')+'</div></div>').join("")||'<span class="tiny">Generate a batch from selected references.</span>';
}
$("pipelineRefs").onchange=e=>{const i=e.target.dataset.pref;if(i===undefined)return;pipelineRefs[Number(i)].selected=e.target.checked;pipelineSave();pipelineDraw()};
$("pipelineDrafts").onchange=e=>{const i=e.target.dataset.pdraft;if(i===undefined)return;pipelineDrafts[Number(i)].selected=e.target.checked;pipelineSave();pipelineDraw()};
$("pipelineDrafts").onclick=e=>{const i=e.target.dataset.pedit;if(i===undefined)return;const v=pipelineDrafts[Number(i)];
 const title=prompt("SEO title (up to 100 characters)",v.seo.title);if(title===null)return;
 const script=prompt("Narration script",v.script);if(script===null)return;
 const visual=prompt("Visual prompt",v.prompt);if(visual===null)return;
 const description=prompt("YouTube description",v.seo.description);if(description===null)return;
 const tags=prompt("Tags, separated by commas",v.seo.tags.join(", "));if(tags===null)return;
 if(!title.trim()||!script.trim())return alert("Title and script are required.");
 v.title=title.trim();v.script=script.trim();v.prompt=visual.trim();v.seo={...v.seo,title:title.trim(),description:description.trim(),tags:tags.split(",").map(x=>x.trim()).filter(Boolean)};v.seoTitle=v.seo.title;v.seoDescription=v.seo.description;v.primaryKeyword=v.seo.primaryKeyword;v.tags=v.seo.tags;pipelineSave();pipelineDraw();
};
$("pipelineResearch").onclick=async()=>{
 const k=keys(),topic=$("pipelineTopic").value.trim();if(!topic)return alert("Enter a research topic.");if(!k.vidiq)return alert("Add your vidIQ MCP API key in API connections.");
 const b=$("pipelineResearch");b.disabled=true;$("pipelineStatus").textContent="Researching breakout Shorts and keywords with vidIQ…";
 try{
  const d=await api("/api/vidiq/research",{key:k.vidiq,topic});pipelineKeywords=d.keywords||[];
  const refs=(d.videos||[]).filter(v=>v&&typeof v==="object").sort((a,b)=>pipelineScore(b)-pipelineScore(a));
  pipelineRefs=refs.map((v,i)=>({...v,selected:i<Math.min(10,refs.length)}));pipelineDrafts=[];
  $("pipelineStatus").textContent=refs.length+" references found. Select relevant examples before generating; breakout scores and views are from vidIQ.";
  pipelineSave();pipelineDraw();if(!refs.length)alert("No vidIQ outliers found. Try a broader topic.");
 }catch(e){$("pipelineStatus").textContent=e.message;err(e)}finally{b.disabled=false}
};
$("pipelineGenerate").onclick=async()=>{
 const k=keys(),count=Number($("pipelineCount").value),selected=pipelineRefs.filter(v=>v.selected);
 if(!k.gemini)return alert("Save a Gemini API key in API connections to generate scripts and SEO.");
 if(!selected.length)return alert("Select at least one reference video.");
 const b=$("pipelineGenerate");b.disabled=true;$("pipelineStatus").textContent="Generating original scripts, visual plans and metadata from "+selected.length+" reference records…";
 try{
  const refs=selected.slice(0,15).map(v=>({url:pipelineRefUrl(v),title:String(v.summary||v.description||v.hook||"").slice(0,350),views:v.engagement?.views??v.views??null,likes:v.engagement?.likes??v.likes??null,platform:v.platform||"youtube",outlierScore:v.outlierScore??null,vph:v.vph??null}));
  const d=await api("/api/gemini/research-batch",{key:k.gemini,topic:$("pipelineTopic").value.trim(),direction:$("pipelineDirection").value.trim(),count,references:refs,keywords:pipelineKeywords.slice(0,15)});
  pipelineDrafts=batchRead(d.videos).map(v=>({...v,seo:{title:v.seoTitle,description:v.seoDescription,primaryKeyword:v.primaryKeyword,tags:v.tags},referenceUrl:batchSafeUrl(v.referenceUrl),selected:true}));
  $("pipelineStatus").textContent=pipelineDrafts.length+" drafts generated. Inspect scripts and claims, edit metadata, then send to the rendering queue.";
  pipelineSave();pipelineDraw();
 }catch(e){$("pipelineStatus").textContent=e.message;err(e)}finally{b.disabled=false;pipelineDraw()}
};
$("pipelineQueue").onclick=()=>{
 if(batchRunning)return alert("Finish the active batch before replacing its queue.");
 const selected=pipelineDrafts.filter(v=>v.selected);if(!selected.length)return alert("Select at least one generated draft.");
 if(batchJobs.some(v=>["Rendering","Submitting"].includes(v.status)))return alert("Current Revid renders are still active. Finish those before replacing the queue.");
 if(batchJobs.length&&!confirm("Replace the current Batch Production queue with "+selected.length+" researched drafts? Existing queue statuses will be replaced."))return;
 batchJobs=batchRead(selected.map(v=>({...v,research:v.research||null,seo:{title:v.seoTitle||v.seo?.title||v.title,description:v.seoDescription||v.seo?.description||"",primaryKeyword:v.primaryKeyword||v.seo?.primaryKeyword||"",tags:v.tags||v.seo?.tags||[]}})));
 batchInvalidate();showTab("batch");say("Research drafts transferred to Batch Production. Estimate credits before rendering.");
};
try{const d=JSON.parse(localStorage.getItem(PIPELINE_STORE)||"null");if(d&&typeof d==="object"){pipelineRefs=Array.isArray(d.refs)?d.refs:[];pipelineKeywords=Array.isArray(d.keywords)?d.keywords:[];pipelineDrafts=Array.isArray(d.drafts)?d.drafts:[];if(d.topic)$("pipelineTopic").value=d.topic;if(d.direction)$("pipelineDirection").value=d.direction}}catch(e){}
pipelineDraw();

try{const saved=JSON.parse(localStorage.getItem(BATCH_STORE)||"[]");if(Array.isArray(saved))batchJobs=saved.map(x=>({...batchDefaults,...x,selected:false}))}catch(e){}batchDraw();

$("trendBtn").onclick=async()=>{
 let k=keys(),kw=$("keyword").value.trim();
 if(!kw)return alert("Enter a keyword.");
 if(!k.adsClientId||!k.adsClientSecret||!k.adsRefreshToken||!k.adsCustomerId)return alert("Add the Google OAuth client ID, client secret, refresh token, and Google Ads customer ID in API connections.");
 let b=$("trendBtn");b.disabled=true;b.textContent="Fetching Google keyword data…";
 try{
  let d=await api("/api/googleads/keyword-ideas",{clientId:k.adsClientId,clientSecret:k.adsClientSecret,refreshToken:k.adsRefreshToken,customerId:k.adsCustomerId,loginCustomerId:k.adsLoginCustomerId,keyword:kw,location:$("location").value});
  $("trendResult").classList.add("show");let m=d.metrics||{};
  $("searchVolume").textContent=m.avgMonthlySearches==null?"No estimate returned":Number(m.avgMonthlySearches).toLocaleString();
  $("adsCompetition").textContent=m.competition||"Not available";
  $("competitionIndex").textContent=m.competitionIndex==null?"Not available":m.competitionIndex+" / 100";
  $("bidRange").textContent=m.lowBid==null&&m.highBid==null?"Not available":[m.lowBid,m.highBid].map(x=>x==null?"—":Number(x).toFixed(2)).join(" – ");
  let p=d.monthlyVolumes||[],max=Math.max(1,...p.map(x=>Number(x.value)||0));
  $("trendChart").innerHTML=p.map(x=>'<i title="'+esc(x.label+" · "+Number(x.value).toLocaleString()+" searches")+'" style="flex:1;background:#c3f06b;height:'+Math.max(3,Math.round((Number(x.value)||0)/max*100))+'%;border-radius:3px 3px 0 0"></i>').join("")||'<span class="tiny">Monthly history was not returned for this keyword.</span>';
  $("trendDates").textContent=p.length?"Monthly Google Search estimates · "+p[0].label+" to "+p[p.length-1].label:"";
  $("relatedList").innerHTML=(d.ideas||[]).slice(0,20).map(x=>{
   let competition=x.competition||"Competition n/a";
   if(x.competitionIndex!=null)competition+=" · index "+x.competitionIndex;
   let searches=x.avgMonthlySearches==null?"—":Number(x.avgMonthlySearches).toLocaleString();
   return '<div class="connrow" style="padding:7px 3px;border-bottom:1px solid #34352f"><span style="min-width:0"><b style="display:block;color:#f4f2ea">'+esc(x.keyword)+'</b><small style="color:#a5a79c">'+esc(competition)+'</small></span><b style="white-space:nowrap">'+searches+' / mo</b></div>';
  }).join("")||'<span class="tiny">No related keyword ideas returned.</span>';
  $("trendNote").textContent="Google Ads estimates for "+(d.location||"all locations")+". Bid range is in the Ads account currency. Search-volume history refreshes monthly; ad competition is not organic SEO difficulty.";
  say("Google keyword metrics loaded");
 }catch(e){err(e)}finally{b.disabled=false;b.textContent="Get keyword metrics"}
};
$("startPromptBtn").onclick=()=>{$("promptCard").classList.add("show");if(!$("prompt").value)$("prompt").focus();say("Enter or paste a prompt, then choose a style and render")};
$("savePromptBtn").onclick=()=>{let p=$("prompt").value.trim();if(!p)return alert("Enter a prompt first.");save({topic:$("niche").value.trim()||"My prompt",source:$("refUrl").value.trim()||(S.file&&S.file.name)||"manual",prompt:p,stylePrompt:$("stylePrompt").value,script:$("script").value,analysis:S.analysis});say("Prompt saved in history")};
drawHistory();
</script></body></html>`;

const corsHeaders={"access-control-allow-origin":"*","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type,authorization"};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8",...corsHeaders}});
const youtubeIdFromUrl=raw=>{try{const u=new URL(raw),host=u.hostname.toLowerCase().replace(/^www\./,""),p=u.pathname;let id="";if(host==="youtu.be")id=p.split("/").filter(Boolean)[0]||"";else if(["youtube.com","m.youtube.com","music.youtube.com","youtube-nocookie.com"].includes(host)){if(p==="/watch")id=u.searchParams.get("v")||"";else{const m=p.match(/^\/(?:shorts|embed|live)\/([^/?]+)/);if(m)id=m[1]}}return /^[A-Za-z0-9_-]{11}$/.test(id)?id:""}catch{return""}};
async function mcpCall(key,method,params={}){
 const url="https://www.revid.ai/api/mcp",headers={"content-type":"application/json","accept":"application/json, text/event-stream","authorization":"Bearer "+key,"user-agent":"ClipFarmStudio/1.0"};
 const parse=async r=>{const text=await r.text();if(!r.ok)throw new Error(text.slice(0,600)||"Revid connection failed ("+r.status+")");if(text.trim().startsWith("data:")){const line=text.split("\n").filter(x=>x.startsWith("data:")).pop();return JSON.parse(line.slice(5).trim())}return JSON.parse(text)};
 const init=await fetch(url,{method:"POST",headers,body:JSON.stringify({jsonrpc:"2.0",id:1,method:"initialize",params:{protocolVersion:"2025-06-18",capabilities:{},clientInfo:{name:"clip-farm-studio",version:"1.0.0"}}})});
 if(!init.ok)throw new Error("Revid MCP initialization failed ("+init.status+").");
 const session=init.headers.get("mcp-session-id");const initData=await parse(init);if(initData.error)throw new Error(initData.error.message||"Revid initialization failed.");
 if(session)headers["mcp-session-id"]=session;
 await fetch(url,{method:"POST",headers,body:JSON.stringify({jsonrpc:"2.0",method:"notifications/initialized",params:{}})});
 const response=await fetch(url,{method:"POST",headers,body:JSON.stringify({jsonrpc:"2.0",id:2,method,params})});
 const data=await parse(response);if(data.error)throw new Error(data.error.message||"Revid tool call failed.");
 return data.result;
}
async function revidRest(path,key,body){
 const r=await fetch("https://www.revid.ai/api/public/v3/"+path,{method:body?"POST":"GET",headers:{"content-type":"application/json","key":key,"user-agent":"ClipFarmStudio/1.0"},...(body?{body:JSON.stringify(body)}:{})});
 const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={error:t.slice(0,500)}}
 if(!r.ok||d.success===0)throw new Error(d.error||d.message||(d.code==="RATE_LIMIT_EXCEEDED"?"Revid’s video-search limit for this account has been reached.":"Revid request failed ("+r.status+")."));
 return d;
}

async function vidiqCall(apiKey,toolName,args){
 const url="https://mcp.vidiq.com/mcp";
 const headers={"authorization":"Bearer "+apiKey,"content-type":"application/json","accept":"application/json, text/event-stream","mcp-protocol-version":"2025-03-26"};
 async function send(method,params,id,session){
  const h={...headers};if(session)h["mcp-session-id"]=session;
  const payload={jsonrpc:"2.0",method,...(id===null?{}:{id}),...(params===undefined?{}:{params})};
  const r=await fetch(url,{method:"POST",headers:h,body:JSON.stringify(payload)});
  const body=await r.text();if(!r.ok)throw Error("vidIQ request failed ("+r.status+"): "+body.slice(0,300));
  let value;try{value=JSON.parse(body)}catch{for(const line of body.split("\n")){if(!line.startsWith("data:"))continue;try{const d=JSON.parse(line.slice(5).trim());if(d.result||d.error){value=d;break}}catch{}}}
  if(value?.error)throw Error("vidIQ: "+(value.error.message||"MCP error"));
  return {value,session:r.headers.get("mcp-session-id")||session};
 }
 const init=await send("initialize",{protocolVersion:"2025-03-26",capabilities:{},clientInfo:{name:"Clip Farm Studio",version:"1.1"}},1);
 if(!init.value?.result)throw Error("vidIQ initialization failed. Check your MCP API key.");
 await send("notifications/initialized",undefined,null,init.session);
 const call=await send("tools/call",{name:toolName,arguments:args},2,init.session);
 const result=call.value?.result;if(!result)throw Error("vidIQ did not return "+toolName+" results");
 if(result.isError)throw Error((result.content||[]).map(x=>x.text||"").join(" ").slice(0,400)||"vidIQ tool failed");
 return String(result.structuredContent?.answer||result.structuredContent?.text||(result.content||[]).map(x=>x.text||"").join("\n")||"");
}
function vidIqNum(raw){const m=String(raw||"").replace(/,/g,"").match(/([\d.]+)\s*([KMB])?/i);if(!m)return null;return Number(m[1])*({K:1000,M:1000000,B:1000000000}[String(m[2]||"").toUpperCase()]||1)}
function parseVidIQOutliers(text){
 const parts=String(text||"").split(/^###\s*\d+\.\s*/m).slice(1),videos=[];
 for(const part of parts){
  const title=part.split("\n")[0].replace(/\*\*/g,"").trim(),id=part.match(/videoId\s*\x60([A-Za-z0-9_-]{11})\x60/),line=part.match(/Performance:\*?\*?\s*([^\n]+)/);
  if(!title||!id||!line)continue;
  const views=line[1].match(/([\d.,]+\s*[KMB]?)\s+views/i),breakout=line[1].match(/([\d.,]+)\s*x\s+breakout/i),vph=line[1].match(/([\d.,]+\s*[KMB]?)\s+views\/hour/i),channel=part.match(/Channel:\*?\*?\s*([^·\n]+)/);
  videos.push({id:id[1],summary:title,url:"https://www.youtube.com/watch?v="+id[1],platform:"youtube",author:{nickname:(channel?.[1]||"").trim()},engagement:{views:views?vidIqNum(views[1]):null},outlierScore:breakout?Number(breakout[1].replace(/,/g,"")):null,vph:vph?vidIqNum(vph[1]):null});
 }
 return videos;
}
function parseVidIQKeywords(text){
 const lines=String(text||"").split("\n"),list=[];let found=false;
 for(const line of lines){if(line.includes("| keyword |")&&line.includes("volume")){found=true;continue}if(!found)continue;if(!line.trim().startsWith("|")){if(list.length)break;continue}
  if(/^\|\s*[-:]+/.test(line))continue;const c=line.split("|").slice(1,-1).map(x=>x.trim());
  if(!c[0]||c[0]==="keyword")continue;list.push({keyword:c[0],volume:Number(c[1])||0,competition:c[2]==="null"?null:Number(c[2]),estimatedMonthlySearch:c[4]||null});if(list.length>=15)break;
 }
 return list;
}

async function geminiGenerate(key,input,schema){
 const body={model:"gemini-3.8-flash",input};if(schema)body.response_format=[{type:"text",mime_type:"application/json",schema}];
 const r=await fetch("https://generativelanguage.googleapis.com/v1beta/interactions",{method:"POST",headers:{"content-type":"application/json","x-goog-api-key":key},body:JSON.stringify(body)});
 const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={error:t.slice(0,500)}}
 if(!r.ok||d.error)throw new Error(d.error?.message||d.error||"Gemini request failed ("+r.status+").");
 return d;
}
const analysisSchema={type:"object",properties:{summary:{type:"string"},duration_seconds:{type:"number"},hook:{type:"string"},structure:{type:"array",items:{type:"object",properties:{timestamp:{type:"string"},beat:{type:"string"}},required:["timestamp","beat"]}},pacing:{type:"string"},shot_and_cut_pattern:{type:"string"},captions_and_text:{type:"string"},audio:{type:"string"},transitions:{type:"string"},visual_style:{type:"string"},ending:{type:"string"},reusable_techniques:{type:"array",items:{type:"string"}}},required:["summary","duration_seconds","hook","structure","pacing","shot_and_cut_pattern","captions_and_text","audio","transitions","visual_style","ending","reusable_techniques"]};
const promptSchema={type:"object",properties:{prompt:{type:"string"},stylePrompt:{type:"string"},script:{type:"string"}},required:["prompt","stylePrompt","script"]};
const batchResearchSchema={type:"object",properties:{videos:{type:"array",items:{type:"object",properties:{title:{type:"string"},script:{type:"string"},prompt:{type:"string"},stylePrompt:{type:"string"},referenceUrl:{type:"string"},seo:{type:"object",properties:{title:{type:"string"},description:{type:"string"},primaryKeyword:{type:"string"},tags:{type:"array",items:{type:"string"}}},required:["title","description","primaryKeyword","tags"]}},required:["title","script","prompt","stylePrompt","referenceUrl","seo"]}}},required:["videos"]};
const variantsSchema={type:"object",properties:{variants:{type:"array",items:{type:"object",properties:{title:{type:"string"},angle:{type:"string"},hook:{type:"string"},script:{type:"string"},difference:{type:"string"}},required:["title","angle","hook","script","difference"]}}},required:["variants"]};
function geminiText(x){if(x==null)return"";if(typeof x==="string")return x;if(Array.isArray(x))return x.map(geminiText).filter(Boolean).join("\n");if(typeof x!=="object")return String(x);for(const k of ["output_text","text"])if(typeof x[k]==="string"&&x[k].trim())return x[k];for(const k of ["output","outputs","content","parts","steps"])if(x[k]!=null){const t=geminiText(x[k]);if(t)return t}return""}
function parseGeminiJson(raw){let s=String(raw||"").trim(),f=s.match(/```(?:json)?\s*([\s\S]*?)```/i);if(f)s=f[1].trim();try{return JSON.parse(s)}catch{}for(let a=0;a<s.length;a++){if(s[a]!=="{"&&s[a]!=="[")continue;let stack=[],quoted=false,escape=false;for(let i=a;i<s.length;i++){const c=s[i];if(quoted){if(escape)escape=false;else if(c==="\\")escape=true;else if(c==='"')quoted=false;continue}if(c==='"'){quoted=true;continue}if(c==="{"||c==="[")stack.push(c);else if(c==="}"||c==="]"){const open=stack.pop();if((open==="{"&&c!=="}")||(open==="["&&c!=="]"))break;if(!stack.length){try{return JSON.parse(s.slice(a,i+1))}catch{break}}}}}throw new Error("No valid JSON object found")}
async function geminiStructured(key,input,schema){const decode=response=>{const value=parseGeminiJson(geminiText(response));if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("Expected a JSON object");for(const field of schema.required||[])if(!(field in value))throw new Error("Missing required field: "+field);return value};const first=await geminiGenerate(key,input,schema);try{return decode(first)}catch{const raw=geminiText(first).slice(0,15000);const retry=await geminiGenerate(key,[{type:"text",text:"Return one valid JSON object that follows the response schema. Convert the supplied response into the requested fields without adding commentary. If a field is missing, infer a concise value from the supplied response.\n\nResponse to convert:\n"+raw}],schema);try{return decode(retry)}catch{throw new Error("Gemini returned a response, but it could not be converted to the required JSON format. Check the video is accessible, then retry. "+(raw?"Response excerpt: "+raw.slice(0,140):"No text output was returned."))}}}
export default {async fetch(request){
 const url=new URL(request.url);if(request.method==="OPTIONS")return new Response(null,{headers:corsHeaders});
 if(request.method==="GET"&&url.pathname==="/")return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
 try{
  if(request.method==="POST"&&url.pathname==="/api/vidiq/research"){
   const {key,topic}=await request.json();if(!key||!String(topic||"").trim())throw Error("vidIQ key and research topic required.");
   const keyword=String(topic).trim().slice(0,150),outliers=await vidiqCall(key,"vidiq_outliers",{keyword,contentType:"short",limit:20});
   const videos=parseVidIQOutliers(outliers);
   let keywords=[],keywordError="";
   try{const result=await vidiqCall(key,"vidiq_keyword_research",{mode:"research",keyword,limit:12});keywords=parseVidIQKeywords(result)}
   catch(e){keywordError=String(e.message||e).slice(0,220)}
   return json({source:"vidIQ MCP",videos,keywords,keywordError});
  }
  if(request.method==="POST"&&url.pathname==="/api/gemini/research-batch"){
   const {key,topic,direction,count,references,keywords}=await request.json();
   if(!key||!topic)throw new Error("Gemini key and topic are required.");
   if(!Array.isArray(references)||!references.length)throw new Error("Select research references before generating.");
   const n=Math.min(10,Math.max(1,Number(count)||5));
   const items=references.slice(0,15).map(v=>({title:String(v.title||"").slice(0,350),url:String(v.url||"").slice(0,300),views:Number.isFinite(Number(v.views))&&v.views!==null?Number(v.views):null,likes:Number.isFinite(Number(v.likes))&&v.likes!==null?Number(v.likes):null}));
   const instruction="You are writing ORIGINAL educational short videos, not remakes. Produce EXACTLY "+n+" distinct videos for topic "+String(topic).slice(0,250)+". Creative direction: "+String(direction||"").slice(0,900)+". Base ideas on these real video reference records. Do not claim vidiq scores or invent research metrics. Pick concepts with strong visual hooks and report no fictional facts, dates or dimensions. Avoid unsupported specifics when you cannot independently verify them. For each return title, exact spoken narration script approximately 90-115 words, detailed visual prompt for 9:16 original 3D scenes, separate stylePrompt, referenceUrl copied verbatim from a provided reference where possible, seo with compelling YouTube title <=100 characters, accurate YouTube description, one discoverable primary keyword and 6-12 relevant tags. No reuse of source scripts or footage. Use plain English. Return a JSON object matching schema. vidIQ keyword ideas: "+JSON.stringify(Array.isArray(keywords)?keywords.slice(0,15):[])+". References: "+JSON.stringify(items);
   const generated=await geminiStructured(key,[{type:"text",text:instruction}],batchResearchSchema);
   if(!Array.isArray(generated.videos)||!generated.videos.length)throw new Error("Gemini returned no videos.");
   const urls=new Set(items.map(v=>v.url).filter(Boolean));
   const videos=generated.videos.slice(0,n).map((v,i)=>{
    if(!v.script||!v.seo?.title)throw new Error("Generated video "+(i+1)+" is missing its script or SEO title.");
    const original=urls.has(v.referenceUrl)?v.referenceUrl:"";
    return {title:String(v.title||v.seo.title).slice(0,180),script:String(v.script).slice(0,3000),prompt:String(v.prompt||"").slice(0,5000),stylePrompt:String(v.stylePrompt||"").slice(0,1400),referenceUrl:original,seo:{title:String(v.seo.title).slice(0,100),description:String(v.seo.description||"").slice(0,5000),primaryKeyword:String(v.seo.primaryKeyword||"").slice(0,200),tags:Array.isArray(v.seo.tags)?v.seo.tags.map(String).slice(0,25):[]}};
   });
   return json({videos,source:"Gemini drafts from selected Revid-index references; metadata not independently validated"});
  }
  if(request.method==="POST"&&url.pathname==="/api/gemini/check"){
   const {key}=await request.json();const d=await geminiGenerate(key,[{type:"text",text:"Reply with exactly OK."}]);return json({ok:true,reply:JSON.stringify(d).slice(0,200)});
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/check"){
   const {key}=await request.json();const d=await revidRest("me",key);const r=await mcpCall(key,"tools/list",{});return json({ok:true,account:d,tools:r.tools||[]});
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/tools"){
   const {key}=await request.json();const r=await mcpCall(key,"tools/list",{});return json({tools:r.tools||[]});
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/tool"){
   const {key,name,arguments:args}=await request.json();const r=await mcpCall(key,"tools/call",{name,arguments:args});if(r.isError)throw new Error((r.content||[]).map(c=>c.text||"").join("\n")||"Revid upload request failed.");return json({result:r.structuredContent||r});
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/search"){
   const {key,query,platforms,sort,limit,minLikes,viralOnly}=await request.json();if(!key)throw new Error("Revid API key is required for video search.");if(!query)throw new Error("Enter a search topic.");const p=new URLSearchParams({query:String(query),platforms:(platforms||["youtube","instagram","tiktok"]).join(","),sort:sort||"relevance",limit:String(Math.min(20,Math.max(1,Number(limit)||12)))});if(Number(minLikes)>0)p.set("minLikes",String(Math.floor(Number(minLikes))));if(viralOnly)p.set("viralOnly","true");return json(await revidRest("search-viral-videos?"+p.toString(),key));
  }
  if(request.method==="POST"&&url.pathname==="/api/apify/extract"){
   const {token,url:videoUrl}=await request.json();if(!token)throw new Error("Apify API token is required to extract a public social video.");let u;try{u=new URL(videoUrl)}catch{throw new Error("Enter a complete public video URL.")}if(!["http:","https:"].includes(u.protocol))throw new Error("Use a public HTTP or HTTPS video URL.");const host=u.hostname.toLowerCase();let metricsPlatform="";if(host==="instagram.com"||host.endsWith(".instagram.com"))metricsPlatform="instagram";else if(host==="tiktok.com"||host.endsWith(".tiktok.com"))metricsPlatform="tiktok";
   const h={"content-type":"application/json","authorization":"Bearer "+token};const start=async(actor,input)=>{const r=await fetch("https://api.apify.com/v2/acts/"+actor+"/runs?waitForFinish=0",{method:"POST",headers:h,body:JSON.stringify(input)});const d=await r.json().catch(()=>({}));if(!r.ok||!d.data?.id)throw new Error(d.error?.message||d.message||"Apify could not start "+actor+" ("+r.status+").");return d.data.id};
   const extractorRun=await start("gentle_cloud~video-download-link-crawler",{start_urls:[videoUrl],request_timeout:40});let metricsRunId=null,metricsError="";
   if(metricsPlatform){try{let metricUrl=videoUrl;if(metricsPlatform==="instagram"){metricUrl=metricUrl.replace(/\/reels\//i,"/reel/");metricsRunId=await start("apify~instagram-scraper",{directUrls:[metricUrl],resultsType:"posts",resultsLimit:1})}else metricsRunId=await start("clockworks~tiktok-scraper",{postURLs:[videoUrl],resultsPerPage:1,shouldDownloadVideos:false,shouldDownloadCovers:false,shouldDownloadAvatars:false,shouldDownloadMusicCovers:false})}catch(e){metricsError=String(e?.message||e).slice(0,300)}}
   return json({runId:extractorRun,metricsRunId,metricsPlatform,metricsError});
  }
  if(request.method==="POST"&&url.pathname==="/api/apify/extract-status"){
   const {token,runId}=await request.json();if(!token||!runId)throw new Error("Apify token and extraction run are required.");const h={"authorization":"Bearer "+token},r=await fetch("https://api.apify.com/v2/actor-runs/"+encodeURIComponent(runId),{headers:h}),d=await r.json().catch(()=>({}));if(!r.ok||!d.data)throw new Error(d.error?.message||d.message||"Could not check the Apify extraction status.");const state=d.data.status;if(state==="FAILED"||state==="ABORTED"||state==="TIMED-OUT")return json({done:true,failed:true,error:d.data.statusMessage||"Apify could not extract this public video."});if(state!=="SUCCEEDED")return json({done:false,status:state});const dataId=d.data.defaultDatasetId;if(!dataId)throw new Error("Apify finished without a result dataset.");const itemsR=await fetch("https://api.apify.com/v2/datasets/"+encodeURIComponent(dataId)+"/items?format=json&clean=true",{headers:h}),items=await itemsR.json().catch(()=>[]);if(!itemsR.ok||!Array.isArray(items)||!items.length)return json({done:true,failed:true,error:"Apify finished but returned no video data."});const item=items[0],formats=item.formats||[],fmt=formats.find(x=>x.ext==="mp4"&&x.acodec&&x.acodec!=="none")||formats.find(x=>x.type==="video+audio")||formats.find(x=>x.url&&x.ext==="mp4"),mediaUrl=item.best_download_url||item.bestDownloadUrl||item.videoUrl||item.video_url||fmt?.url;if(!mediaUrl)return json({done:true,failed:true,error:item.error||"No direct playable video URL was returned."});const first=(...values)=>{const v=values.find(x=>x!==null&&x!==undefined&&x!=="");return v==null?null:(Number.isFinite(Number(v))?Number(v):null)};return json({done:true,asset:{url:mediaUrl,title:item.title||item.description||item.caption||"Social video",duration:first(item.duration,item.duration_seconds,item.videoDuration)||0,thumbnail:item.thumbnail||item.thumbnailUrl||item.displayUrl||"",views:first(item.view_count,item.views,item.viewCount,item.videoViewCount,item.videoPlayCount,item.igPlayCount,item.playCount),likes:first(item.like_count,item.likes,item.likesCount,item.diggCount),comments:first(item.comment_count,item.commentsCount,item.commentCount),shares:first(item.share_count,item.sharesCount,item.shareCount),saves:first(item.save_count,item.savedCount,item.collectCount),reposts:first(item.repostCount,item.repost_count),creator:item.uploader||item.ownerUsername||item.authorMeta?.name||item.authorMeta?.nickName||"",caption:item.description||item.caption||""}});
  }
  if(request.method==="POST"&&url.pathname==="/api/apify/metrics-status"){
   const {token,runId,platform}=await request.json();if(!token||!runId||!["instagram","tiktok"].includes(platform))throw new Error("Apify token, metrics run, and social platform are required.");const h={"authorization":"Bearer "+token},r=await fetch("https://api.apify.com/v2/actor-runs/"+encodeURIComponent(runId),{headers:h}),d=await r.json().catch(()=>({}));if(!r.ok||!d.data)return json({done:true,failed:true,error:d.error?.message||d.message||"Could not check the social metrics run."});const state=d.data.status;if(["FAILED","ABORTED","TIMED-OUT"].includes(state))return json({done:true,failed:true,error:d.data.statusMessage||"Apify could not retrieve public metrics for this post."});if(state!=="SUCCEEDED")return json({done:false,status:state});const dataId=d.data.defaultDatasetId;if(!dataId)return json({done:true,failed:true,error:"The metrics run completed without a result dataset."});const itemsR=await fetch("https://api.apify.com/v2/datasets/"+encodeURIComponent(dataId)+"/items?format=json&clean=true",{headers:h}),items=await itemsR.json().catch(()=>[]);if(!itemsR.ok||!Array.isArray(items)||!items.length)return json({done:true,failed:true,error:"No public metrics were returned for this post."});const item=items[0],first=(...values)=>{const v=values.find(x=>x!==null&&x!==undefined&&x!=="");return v==null?null:(Number.isFinite(Number(v))?Number(v):null)},metrics=platform==="instagram"?{views:first(item.videoPlayCount,item.igPlayCount,item.videoViewCount,item.playCount),likes:first(item.likesCount,item.likeCount,item.likes),comments:first(item.commentsCount,item.commentCount,item.comments),shares:first(item.sharesCount,item.shareCount),saves:first(item.savedCount,item.saveCount),reposts:null,creator:item.ownerUsername||item.ownerFullName||"",caption:item.caption||"",duration:first(item.videoDuration,item.duration)||0,thumbnail:item.displayUrl||item.thumbnail||"",metricsSource:"Apify Instagram Scraper"}:{views:first(item.playCount,item.viewCount,item.views),likes:first(item.diggCount,item.likeCount,item.likes),comments:first(item.commentCount,item.commentsCount),shares:first(item.shareCount,item.sharesCount),saves:first(item.collectCount,item.saveCount),reposts:first(item.repostCount),creator:item.authorMeta?.name||item.authorMeta?.nickName||item.author?.nickname||"",caption:item.text||item.desc||item.description||"",duration:first(item.videoMeta?.duration,item.duration)||0,thumbnail:item.videoMeta?.coverUrl||item.cover||"",metricsSource:"Apify TikTok Scraper"};return json({done:true,metrics});
  }
  if(request.method==="POST"&&url.pathname==="/api/gemini/analyze"){
   let key,name,mimeType,prompt,bytes,asset;
   if((request.headers.get("content-type")||"").includes("multipart/form-data")){
    const form=await request.formData();key=String(form.get("key")||"");name=String(form.get("name")||"reference-video");mimeType=String(form.get("mimeType")||"video/mp4");prompt=String(form.get("prompt")||"Analyze this reference video and return structured JSON.");const video=form.get("video");if(!video||typeof video.arrayBuffer!=="function")throw new Error("Add a video file first.");if(video.size>52428800)throw new Error("Reference videos must be 50 MB or smaller.");bytes=await video.arrayBuffer();
   }else{
    const body=await request.json();key=body.key;name=body.name||"reference-video";mimeType=body.mimeType||"video/mp4";prompt=body.prompt||"Analyze this reference video and return structured JSON.";const assetUrl=body.videoUrl||body.url;if(!assetUrl)throw new Error("Add a video URL.");const youtubeId=youtubeIdFromUrl(assetUrl);if(youtubeId){if(!key)throw new Error("Gemini API key is required.");const canonicalUrl="https://www.youtube.com/watch?v="+youtubeId;const parsed=await geminiStructured(key,[{type:"video",uri:canonicalUrl},{type:"text",text:prompt+" Return only valid JSON."}],analysisSchema);return json({response:JSON.stringify(parsed),source:"youtube"})}asset=await fetch(assetUrl);if(!asset.ok)throw new Error("Could not retrieve the video URL ("+asset.status+").");const size=Number(asset.headers.get("content-length")||0);if(size>52428800)throw new Error("Reference videos must be 50 MB or smaller.");bytes=await asset.arrayBuffer();if(bytes.byteLength>52428800)throw new Error("Reference videos must be 50 MB or smaller.");
   }
   if(!key)throw new Error("Gemini API key is required.");
   const start=await fetch("https://generativelanguage.googleapis.com/upload/v1beta/files?key="+encodeURIComponent(key),{method:"POST",headers:{"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":String(bytes.byteLength),"X-Goog-Upload-Header-Content-Type":mimeType,"content-type":"application/json"},body:JSON.stringify({file:{display_name:name}})});
   if(!start.ok)throw new Error("Gemini upload setup failed ("+start.status+"): "+(await start.text()).slice(0,300));const uploadUrl=start.headers.get("x-goog-upload-url");if(!uploadUrl)throw new Error("Gemini did not return an upload URL.");
   const uploaded=await fetch(uploadUrl,{method:"POST",headers:{"X-Goog-Upload-Command":"upload, finalize","X-Goog-Upload-Offset":"0","content-type":mimeType},body:bytes});if(!uploaded.ok)throw new Error("Gemini could not receive the video ("+uploaded.status+"): "+(await uploaded.text()).slice(0,300));
   const f=await uploaded.json(),uri=f.file?.uri||f.uri,fileName=f.file?.name||f.name,fileType=f.file?.mimeType||f.mimeType||mimeType;if(!uri)throw new Error("Gemini did not return a video file reference.");
   let state=f.file?.state||f.state;for(let i=0;state&&state!=="ACTIVE"&&i<12;i++){await new Promise(r=>setTimeout(r,2500));const check=await fetch("https://generativelanguage.googleapis.com/v1beta/"+fileName+"?key="+encodeURIComponent(key));const c=await check.json();state=c.state;if(state==="FAILED")throw new Error("Gemini could not process this video. Try a shorter MP4.");}
   if(state&&state!=="ACTIVE")throw new Error("Gemini is still processing the upload. Wait briefly and try again.");
   const parsed=await geminiStructured(key,[{type:"video",uri,mime_type:fileType},{type:"text",text:prompt+" Return only valid JSON."}],analysisSchema);return json({response:JSON.stringify(parsed)});
  }
  if(request.method==="POST"&&url.pathname==="/api/gemini/prompt"){
   const {key,analysis,topic,direction}=await request.json();if(!key)throw new Error("Gemini API key is required.");const instruction="Create a detailed, reusable video-generation prompt based on the REFERENCE ANALYSIS. Make original content for this topic: "+(topic||"a similar audience")+". User direction: "+(direction||"Make it clear, useful, and engaging.")+". Carry over broad techniques such as hook timing, pacing, visual rhythm, transitions, caption treatment, audio mood, and ending structure. Do not reuse reference dialogue, claims, named creator, or unique scenes. Produce a specific scene-by-scene prompt that works in a text-to-video generator. Also provide stylePrompt as separate visual instructions and a concise original narration script of about 25–40 seconds. Return only JSON: {\"prompt\":\"...\",\"stylePrompt\":\"...\",\"script\":\"...\"}. Analysis: "+JSON.stringify(analysis);
   const parsed=await geminiStructured(key,[{type:"text",text:instruction}],promptSchema);return json({response:JSON.stringify(parsed)});
  }
  if(request.method==="POST"&&url.pathname==="/api/googleads/keyword-ideas"){
   const {clientId,clientSecret,refreshToken,customerId,loginCustomerId,keyword,location}=await request.json();
   if(!clientId||!clientSecret||!refreshToken||!customerId||!keyword)throw new Error("Google OAuth client ID, client secret, refresh token, customer ID, and keyword are required.");
   const cid=String(customerId).replace(/\D/g,"");if(!/^\d{10}$/.test(cid))throw new Error("Google Ads customer ID must be 10 digits, without hyphens.");
   const oauth=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:clientId,client_secret:clientSecret,refresh_token:refreshToken,grant_type:"refresh_token"})});
   const tokenData=await oauth.json().catch(()=>({}));if(!oauth.ok||!tokenData.access_token)throw new Error(tokenData.error_description||tokenData.error||"Google OAuth could not refresh the access token. Check the OAuth credentials and refresh token.");
   const geoIds={"United States":"2840","United Kingdom":"2826",Canada:"2124",Australia:"2036",India:"2356"},geo=location&&location!=="Worldwide"&&geoIds[location]?["geoTargetConstants/"+geoIds[location]]:[];
   const headers={"content-type":"application/json","authorization":"Bearer "+tokenData.access_token};if(loginCustomerId){const manager=String(loginCustomerId).replace(/\D/g,"");if(!/^\d{10}$/.test(manager))throw new Error("Manager customer ID must be 10 digits, without hyphens.");headers["login-customer-id"]=manager}
   const requestAds=async(method,body)=>{const r=await fetch("https://googleads.googleapis.com/v26/customers/"+cid+":"+method,{method:"POST",headers,body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok){const detail=d.error?.details?.flatMap(x=>x.errors||[]).map(x=>x.message).find(Boolean);throw new Error(detail||d.error?.message||"Google Ads API request failed ("+r.status+"). Verify Explorer access and account permissions.")}return d};
   const targeting={geoTargetConstants:geo,language:"languageConstants/1000",keywordPlanNetwork:"GOOGLE_SEARCH"};
   const history=await requestAds("generateKeywordHistoricalMetrics",{customerId:cid,keywords:[String(keyword).trim()],...targeting,historicalMetricsOptions:{includeAverageCpc:true}});
   await new Promise(resolve=>setTimeout(resolve,1050));
   const ideasResponse=await requestAds("generateKeywordIdeas",{customerId:cid,keywordSeed:{keywords:[String(keyword).trim()]},...targeting,includeAdultKeywords:false,pageSize:50});
   const hist=history.results?.[0]||{},m=hist.keywordMetrics||{},monthNames={JANUARY:"Jan",FEBRUARY:"Feb",MARCH:"Mar",APRIL:"Apr",MAY:"May",JUNE:"Jun",JULY:"Jul",AUGUST:"Aug",SEPTEMBER:"Sep",OCTOBER:"Oct",NOVEMBER:"Nov",DECEMBER:"Dec"},monthNums={JANUARY:1,FEBRUARY:2,MARCH:3,APRIL:4,MAY:5,JUNE:6,JULY:7,AUGUST:8,SEPTEMBER:9,OCTOBER:10,NOVEMBER:11,DECEMBER:12};
   const monthlyVolumes=(m.monthlySearchVolumes||[]).map(x=>{const month=String(x.month||"").replace(/_MONTH$/,"");return{year:Number(x.year),month:monthNums[month]||Number(month)||0,label:(monthNames[month]||month)+" "+x.year,value:Number(x.monthlySearches)||0}}).sort((a,b)=>a.year-b.year||a.month-b.month);
   const ideas=(ideasResponse.results||[]).map(x=>{const q=x.keywordIdeaMetrics||{};return{keyword:x.text||"",avgMonthlySearches:q.avgMonthlySearches==null?null:Number(q.avgMonthlySearches),competition:q.competition||null,competitionIndex:q.competitionIndex==null?null:Number(q.competitionIndex),lowBid:q.lowTopOfPageBidMicros==null?null:Number(q.lowTopOfPageBidMicros)/1000000,highBid:q.highTopOfPageBidMicros==null?null:Number(q.highTopOfPageBidMicros)/1000000}}).filter(x=>x.keyword);
   return json({keyword:String(keyword).trim(),location:location||"Worldwide",metrics:{avgMonthlySearches:m.avgMonthlySearches==null?null:Number(m.avgMonthlySearches),competition:m.competition||null,competitionIndex:m.competitionIndex==null?null:Number(m.competitionIndex),lowBid:m.lowTopOfPageBidMicros==null?null:Number(m.lowTopOfPageBidMicros)/1000000,highBid:m.highTopOfPageBidMicros==null?null:Number(m.highTopOfPageBidMicros)/1000000,averageCpc:m.averageCpcMicros==null?null:Number(m.averageCpcMicros)/1000000,closeVariants:hist.closeVariants||[]},monthlyVolumes,ideas});
  }
  if(request.method==="POST"&&url.pathname==="/api/gemini/variants"){
   const {key,analysis,niche,count,notes}=await request.json();const prompt="Use the video-analysis JSON below only as a reference for broad editing mechanics. Create "+count+" genuinely different short-video scripts for the niche/topic: "+niche+". Each must have a different angle and hook, its own useful point, a complete spoken script of about 25 to 40 seconds, and a short description of how its pacing/captions can use the reference's techniques. Do not copy the reference's words, claims, identifiable visuals, or creator identity. Follow these extra instructions: "+(notes||"Make the angles distinct and useful. Let the viewer learn one concrete thing.")+". Return JSON only in this exact shape: {\"variants\":[{\"title\":\"\",\"angle\":\"\",\"hook\":\"\",\"script\":\"\",\"difference\":\"\"}]}. Reference analysis: "+JSON.stringify(analysis);
   const parsed=await geminiStructured(key,[{type:"text",text:prompt}],variantsSchema);return json({response:JSON.stringify(parsed)});
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/estimate"){
   const {payload}=await request.json();const r=await fetch("https://www.revid.ai/api/public/v3/calculate-credits",{method:"POST",headers:{"content-type":"application/json","user-agent":"ClipFarmStudio/1.0"},body:JSON.stringify(payload)});const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={error:t.slice(0,300)}}if(!r.ok)throw new Error(d.error||"Cost estimate failed ("+r.status+").");return json(d);
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/render"){
   const {key,payload}=await request.json();return json(await revidRest("render",key,payload));
  }
  if(request.method==="POST"&&url.pathname==="/api/revid/projects"){
    const {key}=await request.json();if(!key)throw new Error("Revid API key required.");
    return json(await revidRest("projects",key));
   }
   if(request.method==="POST"&&url.pathname==="/api/revid/social-accounts"){
    const {key}=await request.json();if(!key)throw new Error("Revid key required.");return json(await revidRest("social-accounts",key));
   }
   if(request.method==="POST"&&url.pathname==="/api/revid/publish-now"){
    const {key,videoUrl,pid,accountId,title,description}=await request.json();
    if(!key||!pid||!videoUrl||!accountId||!title||!description)throw new Error("Rendered video, YouTube account, title and description required.");
    if(!/^https:\/\//.test(videoUrl))throw new Error("Secure video URL required.");
    const payload={videoUrl,youtube:{id:String(accountId),title:String(title).slice(0,100),description:String(description).slice(0,5000)},extraParams:{title:String(title).slice(0,100),description:String(description).slice(0,5000)}};
    return json(await revidRest("publish-now",key,payload));
   }
   if(request.method==="POST"&&url.pathname==="/api/revid/publish-status"){
    const {key,contentId}=await request.json();if(!key||!contentId)throw Error("Revid key and publishing ID required.");
    return json(await revidRest("publish-status?contentId="+encodeURIComponent(contentId),key));
   }
   if(request.method==="POST"&&url.pathname==="/api/revid/status"){
   const {key,pid}=await request.json();return json(await revidRest("status?pid="+encodeURIComponent(pid),key));
  }
  return json({error:"Route not found"},404);
 }catch(e){return json({error:String(e?.message||e).slice(0,900)},400)}
}};
