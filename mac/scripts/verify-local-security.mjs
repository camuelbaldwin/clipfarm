import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCAL_ORIGIN, SESSION_HEADER, newSessionToken, validSession, allowedLocalRequest } from "../local-auth.mjs";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");
const token = newSessionToken();
const second = newSessionToken();
const base = { pathname: "/api/revid/projects", method: "POST", host: "127.0.0.1:43129", origin: LOCAL_ORIGIN, token };
const allows = (overrides = {}) => allowedLocalRequest({ ...base, ...overrides }, token);

assert.equal(token.length, 43, "A random 256-bit base64url session token is expected");
assert.notEqual(token, second, "Each new app session must have an independent passcode");
assert.equal(validSession(token, token), true);
assert.equal(validSession(second, token), false);
assert.equal(validSession("", token), false);
assert.equal(SESSION_HEADER, "x-clip-farm-session");

assert.equal(allows(), true, "App origin and correct token must pass");
assert.equal(allows({ pathname: "/api/youtube/upload-unlisted" }), true, "Authorized Unlisted uploads must work");
assert.equal(allows({ pathname: "/api/gemini/analyze" }), true, "Multipart video analysis must remain available");
assert.equal(allows({ token: undefined }), false, "Missing token must fail");
assert.equal(allows({ token: second }), false, "Invalid token must fail");
assert.equal(allows({ origin: undefined }), false, "Missing Origin must fail");
assert.equal(allows({ origin: "https://untrusted.example" }), false, "Foreign website must fail");
assert.equal(allows({ origin: "http://localhost:43129" }), false, "Different localhost origin must fail");
assert.equal(allows({ host: "evil.example" }), false, "DNS rebinding Host must fail");
assert.equal(allows({ host: "localhost:43129" }), false, "Alternate Host must fail");
assert.equal(allows({ method: "OPTIONS" }), false, "Preflight requests must fail");
assert.equal(allows({ method: "GET" }), false, "Sensitive routes must reject GET");
assert.equal(allows({ pathname: "/other", method: "POST" }), false, "Unknown paths must fail");
assert.equal(allows({ pathname: "/", method: "GET", origin: undefined, token: undefined }), true, "App initial page must load without authentication");
assert.equal(allows({ pathname: "/api/youtube/callback", method: "GET", origin: undefined, token: undefined }), true, "Google OAuth browser callback must continue working");
assert.equal(allows({ pathname: "/api/youtube/callback", method: "POST", origin: undefined, token: undefined }), false, "OAuth callback must only accept GET");

const [main, preload, worker, pkg] = await Promise.all([
  read("mac/main.mjs"), read("mac/preload.cjs"), read("worker/index.js"), read("mac/package.json")
]);
assert(main.includes("allowedLocalRequest({"), "Mac HTTP entry point must authenticate before forwarding");
assert(main.indexOf("allowedLocalRequest({") < main.indexOf("handleYouTube(incoming, outgoing"), "Authentication must precede YouTube API handling");
assert(main.includes('ipcMain.handle("clip-farm:session"'), "Session passcode must be delivered by Electron IPC");
assert(main.includes("event.sender !== mainWindow.webContents"), "IPC must check the main app window");
assert(main.includes("event.senderFrame?.url"), "IPC must check the sender's exact frame origin");
assert(preload.includes('ipcRenderer.invoke("clip-farm:session")'), "Sandboxed preload must use the IPC bridge");
assert(worker.includes("...await localSessionHeaders()"), "General API fetch must carry session passcode");
assert(worker.includes("headers:await localSessionHeaders(),body:f"), "Multipart video uploads must carry session passcode");
assert(!worker.includes('"access-control-allow-origin":"*"'), "Wildcard CORS is forbidden");
assert(JSON.parse(pkg).build.files.includes("preload.cjs"), "Electron preload must be inside Mac installer");
assert(JSON.parse(pkg).build.files.includes("local-auth.mjs"), "Local authentication module must be inside Mac installer");
console.log("Clip Farm local server security checks passed.");
