import { app, BrowserWindow, Menu, shell, ipcMain } from "electron";
import { newSessionToken, allowedLocalRequest, LOCAL_ORIGIN, SESSION_HEADER } from "./local-auth.mjs";
import { createServer } from "node:http";
import { handleYouTube, restoreYouTubeConnection } from "./youtube-upload.mjs";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
let server;
let localOrigin;
let mainWindow;
const sessionToken = newSessionToken();

async function readBody(request, limit = 55 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw new Error("Request is too large. The upload limit is 50 MB.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function startLocalServer() {
  const { default: clipFarmWorker } = await import(pathToFileURL(join(here, "worker.mjs")).href);

  server = createServer(async (incoming, outgoing) => {
    try {
      const requestUrl = new URL(incoming.url || "/", LOCAL_ORIGIN);
      const authorized = allowedLocalRequest({
        pathname: requestUrl.pathname,
        method: incoming.method || "GET",
        host: incoming.headers.host,
        origin: incoming.headers.origin,
        token: incoming.headers[SESSION_HEADER]
      }, sessionToken);
      if (!authorized) {
        outgoing.writeHead(403, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
        outgoing.end(JSON.stringify({ error: "Local Clip Farm session not authorized. Open Clip Farm Studio and try again." }));
        return;
      }
      if (await handleYouTube(incoming, outgoing, requestUrl)) return;
      const address = server.address();
      const origin = `http://127.0.0.1:${address.port}`;
      const headers = new Headers();
      for (const [name, value] of Object.entries(incoming.headers)) {
        if (["host", "connection", "transfer-encoding", "upgrade"].includes(name.toLowerCase())) continue;
        if (Array.isArray(value)) value.forEach((item) => headers.append(name, item));
        else if (value !== undefined) headers.set(name, value);
      }

      const method = incoming.method || "GET";
      const body = ["GET", "HEAD"].includes(method) ? undefined : await readBody(incoming);
      const request = new Request(new URL(incoming.url || "/", origin), {
        method,
        headers,
        ...(body ? { body, duplex: "half" } : {})
      });
      const response = await clipFarmWorker.fetch(request, {});
      const responseHeaders = Object.fromEntries(response.headers.entries());
      delete responseHeaders["access-control-allow-origin"];
      delete responseHeaders["access-control-allow-headers"];
      delete responseHeaders["access-control-allow-methods"];
      responseHeaders["cache-control"] = "no-store";
      outgoing.writeHead(response.status, responseHeaders);
      outgoing.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      if (!outgoing.headersSent) outgoing.writeHead(500, { "content-type": "application/json; charset=utf-8" });
      outgoing.end(JSON.stringify({ error: error?.message || "Clip Farm could not process this request." }));
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(43129, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
  localOrigin = `http://127.0.0.1:${server.address().port}`;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1420,
    height: 950,
    minWidth: 1000,
    minHeight: 700,
    title: "Clip Farm Studio",
    backgroundColor: "#10110f",
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: join(here, "preload.cjs")
    }
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url !== localOrigin && !url.startsWith(`${localOrigin}/`)) {
      event.preventDefault();
      if (url.startsWith("https://")) shell.openExternal(url);
    }
  });
  mainWindow.loadURL(localOrigin);
  mainWindow.on("closed", () => { mainWindow = null; });
}

function installMenu() {
  const template = [
    {
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    },
    { label: "Edit", submenu: [{ role: "undo" }, { role: "redo" }, { type: "separator" }, { role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "selectAll" }] },
    { label: "View", submenu: [{ role: "reload" }, { role: "togglefullscreen" }] },
    { label: "Window", submenu: [{ role: "minimize" }, { role: "close" }] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(async () => {
  try {
    await restoreYouTubeConnection();
    await startLocalServer();
    ipcMain.handle("clip-farm:session", (event) => {
      const senderUrl = event.senderFrame?.url || "";
      if (!mainWindow || event.sender !== mainWindow.webContents || !(senderUrl === localOrigin || senderUrl.startsWith(localOrigin + "/"))) {
        throw new Error("Session token is available only inside Clip Farm Studio.");
      }
      return sessionToken;
    });
    installMenu();
    createMainWindow();
    app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createMainWindow(); });
  } catch (error) {
    console.error("Clip Farm startup failed:", error);
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (server) server.close();
});
