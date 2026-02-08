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

/* ---------- helpers ---------- */

const getMediaDir = () => {
  const dir = path.join(app.getPath("home"), "AlbumsMedia");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const getTypeFromName = (name) =>
  name.match(/\.(mp4|webm|mov)$/i) ? "video" : "image";

/* ---------- FILE PICKER ---------- */

ipcMain.handle("pick-media", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Media", extensions: ["jpg", "jpeg", "png", "mp4", "webm", "mov"] },
    ],
  });

  if (result.canceled) return [];

  const mediaDir = getMediaDir();

  return result.filePaths.map((sourcePath) => {
    const fileName = path.basename(sourcePath);
    const destPath = path.join(mediaDir, fileName);

    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }

    return {
      name: fileName,
      path: destPath,
      type: getTypeFromName(fileName),
    };
  });
});

/* ---------- DRAG & DROP RESOLVER ---------- */

ipcMain.handle("resolve-dropped-files", async (_, names) => {
  const mediaDir = getMediaDir();

  return names
    .map((name) => {
      const fullPath = path.join(mediaDir, name);

      if (!fs.existsSync(fullPath)) return null;

      return {
        name: path.basename(fullPath), // 🔥 GUARANTEED NAME
        path: fullPath,
        type: getTypeFromName(fullPath),
      };
    })
    .filter(Boolean);
});
