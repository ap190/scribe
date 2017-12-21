// const uid = require("uid");
const fs = require("fs");
const path = require("path");
const electron = require("electron");
const UUIDv4 = require("uuid/v4");
const { getScribeImgPath } = require("../utils/getScribeImgPath");
const { scribeImgDir } = require("../utils/consts");

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
    // if (textHasDiff(lastText, text)) {
    console.log(`text is ${text}`);
    mainWindow.webContents.send("create-new-clipping", text);
    // lastText = text;
    // }
  });

  const createImageClipping = globalShortcut.register(
    "CommandOrControl+I",
    () => {
      const image = clipboard.readImage().toPNG();
      const imgID = UUIDv4();
      const imgPath = getScribeImgPath(imgID);
      console.log("^^^^^^^^^^^^^^^^^^^^");
      console.log(imgPath);

      if (fs.existsSync(scribeImgDir)) {
        fs.writeFile(imgPath, image, "base64", e =>
          mainWindow.webContents.send("create-new-img-clipping", imgPath)
        );
      }

      // mainWindow.webContents.send("create-new-img-clipping", image);
    }
  );

  const saveWorkspace = globalShortcut.register("CommandOrControl+B", () => {
    mainWindow.webContents.send("save-workspace");
  });

  if (!saveWorkspace) console.log("Registration failed", "saveWorkspace");
  if (!createClipping) console.log("Registration failed", "createClipping");
  if (!createImageClipping) console.log("Registration failed", "imageClipping");
};

module.exports = registerGlobalShortcuts;
