const { contextBridge, ipcRenderer } = require("electron");

/* 🔥 REQUIRED FOR DRAG & DROP */
window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());
});

contextBridge.exposeInMainWorld("electronAPI", {
  pickMedia: () => ipcRenderer.invoke("pick-media"),
  resolveDroppedFiles: (names) =>
    ipcRenderer.invoke("resolve-dropped-files", names),
});
