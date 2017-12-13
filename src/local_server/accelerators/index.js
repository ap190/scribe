// const uid = require("uid");
const fs = require("fs");
const path = require("path");
const electron = require("electron");

// Get path to store images
const userDataPath = (electron.app || electron.remote.app).getPath("userData");
const imgpath = path.join(userDataPath, "scribeimg");

registerGlobalShortcuts = (globalShortcut, clipboard, mainWindow) => {
  const createClipping = globalShortcut.register("CommandOrControl+H", () => {
    let copiedText = clipboard.readText();
    mainWindow.webContents.send("create-new-clipping", copiedText); // need to open window first
  });

  const saveWorkspace = globalShortcut.register("CommandOrControl+B", () => {
    mainWindow.webContents.send("save-workspace");
  });

  const pasteImage = globalShortcut.register("CommandOrControl+I", () => {
    const img = clipboard.readImage().toPNG();
    const imgID = uid(10);

    // .mfimg dir exists, lets add photos to it
    if (fs.existsSync(`${imgpath}`)) {
      fs.writeFile(`${imgpath}/${imgID}.png`, img, "base64", e => {
        mainWindow.webContents.send("paste-image", `${imgpath}/${imgID}.png`);
      });
    } else {
      // .mfimg doesn't exist yet, let's create it
      fs.mkdir(`${imgpath}`, e => {
        fs.writeFile(`${imgpath}/${imgID}.png`, img, "base64", e => {
          mainWindow.webContents.send("paste-image", `${imgpath}/${imgID}.png`);
        });
      });
    }
  });

  if (!saveWorkspace) console.log("Registration failed", "saveWorkspace");
  if (!createClipping) console.log("Registration failed", "createClipping");
  if (!pasteImage) console.log("Registration failed", "publishClipping");
};

module.exports = registerGlobalShortcuts;
