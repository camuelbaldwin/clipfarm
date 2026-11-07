import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("clipFarmDesktop", Object.freeze({
  getSessionToken: () => ipcRenderer.invoke("clip-farm:session")
}));
