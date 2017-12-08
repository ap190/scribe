const electron = require("electron");
const { app, ipcMain, clipboard, globalShortcut } = require("electron");
const path = require("path");
const url = require("url");
const { genLoadData } = require("./server/readData");
const { genSaveWorkspace } = require("./server/saveWorkspace");
const { genExportCurrentDocument } = require("./server/exportCurrentDoc");
const setMainMenu = require("./server/menu");
const registerGlobalShortcuts = require("./server/accelerators");

require("electron-context-menu")();

const BrowserWindow = electron.BrowserWindow;
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

ipcMain.on("load-file-req", event => {
  genLoadData(event);
});

ipcMain.on("export-current-doc", (event, html, pdfName) => {
  genExportCurrentDocument(event, html, pdfName);
});

ipcMain.on("save-workspace", (event, arg) => {
  genSaveWorkspace(event, arg);
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 1281,
    height: 800,
    icon: path.join(__dirname, "../public/icons/png/64x64.png"),
    webPreferences: {
      webSecurity: false
    }
  });
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);
  // mainWindow.webContents.openDevTools();

  // React DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  // Redux DevTools
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  // Initializing accelerators
  registerGlobalShortcuts(globalShortcut, clipboard, mainWindow);

  // Create Menu Bar
  setMainMenu(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

exports.mainWindow = mainWindow;
