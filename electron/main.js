const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);

// ---------- IPC: FILE PICKER ----------
ipcMain.handle("pick-media", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Media", extensions: ["jpg", "png", "mp4", "webm"] },
    ],
  });

  if (result.canceled) return [];

  const mediaDir = path.join(
    app.getPath("home"),
    "AlbumsMedia"
  );

  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
  }

  const savedFiles = [];

  for (const filePath of result.filePaths) {
    const fileName = path.basename(filePath);
    const destPath = path.join(mediaDir, fileName);

    fs.copyFileSync(filePath, destPath);

    savedFiles.push({
      name: fileName,
      path: destPath,
      type: fileName.endsWith(".mp4") ? "video" : "image",
    });
  }

  return savedFiles;
});
