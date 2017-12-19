// const uid = require("uid");
const fs = require("fs");
const path = require("path");
const electron = require("electron");

// Get path to store images
const userDataPath = (electron.app || electron.remote.app).getPath("userData");
const imgpath = path.join(userDataPath, "scribeimg");

const textHasDiff = (a, b) => b !== a;
const imageHasDiff = (a, b) =>
  (b && !a) ||
  (typeof a.toDataURL === "function" &&
    typeof b.toDataURL === "function" &&
    b.toDataURL() !== a.toDataURL());
let lastText = undefined;
let lastImg = undefined;

registerGlobalShortcuts = (globalShortcut, clipboard, mainWindow) => {
  const createClipping = globalShortcut.register("CommandOrControl+H", () => {
    const text = clipboard.readText();
    const image = clipboard.readImage();

    console.log("*********");

    if (imageHasDiff(lastImg, image)) {
      console.log(`image is ${image}`);
      mainWindow.webContents.send("img-saved", image);
      lastImg = image;
      return;
    }

    if (textHasDiff(lastText, text)) {
      console.log(`text is ${text}`);
      mainWindow.webContents.send("create-new-clipping", text);
      lastText = text;
    }
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
