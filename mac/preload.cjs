const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("clipFarmDesktop", Object.freeze({
  getSessionToken: () => ipcRenderer.invoke("clip-farm:session")
}));
