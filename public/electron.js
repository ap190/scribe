const electron = require("electron");
const { app, clipboard, globalShortcut } = electron;
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const path = require("path");
const { setIPCListeners } = require("./local_server/ipc");
const setMainMenu = require("./local_server/menu");
const registerGlobalShortcuts = require("./local_server/accelerators");
const { saveBeforeExiting } = require("./local_server/dialogs");
require("dotenv").config();

console.log("environemnt variavbles");
console.log(process.env.GH_TOKEN);

// require("electron-context-menu")();

const BrowserWindow = electron.BrowserWindow;
// const {
//   default: installExtension,
//   REACT_DEVELOPER_TOOLS
// } = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Check for software updates
  autoUpdater.checkForUpdates();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 1281,
    height: 800,
    icon: path.join(__dirname, "../public/icons/png/64x64.png"),
    webPreferences: {
      webSecurity: false
    },
    show: false
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // mainWindow.webContents.openDevTools();

  // React DevTools
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then(name => console.log(`Added Extension:  ${name}`))
  //   .catch(err => console.log("An error occurred: ", err));

  // Initializing accelerators
  registerGlobalShortcuts(globalShortcut, clipboard, mainWindow);

  // Create Menu Bar
  setMainMenu(mainWindow);
  setIPCListeners(mainWindow);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("before-quit", event => {
  // mainWindow.webContents.send("check-for-unsaved-work");
  event.preventDefault();
  saveBeforeExiting(mainWindow);
});

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

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = text => {
  console.log("SOMETHING BIG IS HAPPPENING!! AHHHH?!?!");
  console.info(text);
  if (mainWindow) {
    mainWindow.webContents.send("auto-update", text);
  }
};

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", info => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", info => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", err => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on("download-progress", progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${
      progressObj.percent
    }% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on("update-downloaded", info => {
  sendStatusToWindow("Update downloaded; will install now");
});

autoUpdater.on("update-downloaded", info => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});
