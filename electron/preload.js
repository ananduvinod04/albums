const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  pickMedia: () => ipcRenderer.invoke("pick-media"),
});
