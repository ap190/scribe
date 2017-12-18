const electron = require("electron");
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const { SCRIBE_FILE_PATHS } = require("../consts");
const { getDirSelectionFromUser } = require("../dialogs");
const { mainWindow } = require("../../electron-main");

// Get path to store images
const userDataPath = (electron.app || electron.remote.app).getPath("userData");
const scribeImgDir = path.join(userDataPath, "img");
const getScribeImgPath = imgID => path.join(userDataPath, "img", imgID);

const jsonpath = path.join(
  __dirname,
  "../..",
  "data",
  SCRIBE_FILE_PATHS.SCRIBE_DATA
);

const createLoadableWorkspacePath = userSelectedDir => {
  if (!userSelectedDir) return null;
  return path.join(userSelectedDir, SCRIBE_FILE_PATHS.SCRIBE_DATA);
};

const copyImageToScribeDir = async (srcPath, finalPath) => {
  const inStr = fs.createReadStream(srcPath);
  const outStr = fs.createWriteStream(finalPath);
  await inStr.pipe(outStr);
  return;
};

const copyFile = (source, target) => {
  return new Promise(function(resolve, reject) {
    var rd = fs.createReadStream(source);
    rd.on("error", rejectCleanup);
    var wr = fs.createWriteStream(target);
    wr.on("error", rejectCleanup);
    function rejectCleanup(err) {
      rd.destroy();
      wr.end();
      reject(err);
    }
    wr.on("finish", resolve);
    rd.pipe(wr);
  });
};

exports.genLoadData = event => {
  jsonfile.readFile(jsonpath, "utf8", (err, data) => {
    if (err) {
      console.error("failed to read file");
    }
    event.sender.send("load-file-res", data);
  });
};

exports.genFetchFileContent = (event, filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) console.error("Failed to fetch file content");
    event.sender.send("fetch-file-content-res", { filePath, data });
  });
};

exports.loadWorkspace = (targetWindow, dir) => {
  const userSelectedScribePath = createLoadableWorkspacePath(dir);
  if (!userSelectedScribePath || !dir) return;
  if (fs.existsSync(userSelectedScribePath)) {
    jsonfile.readFile(userSelectedScribePath, "utf8", (err, data) => {
      if (err) console.error(err);
      targetWindow.webContents.send(
        "load-file-res",
        data,
        userSelectedScribePath
      );
    });
  }
};

exports.createNewWorkspace = targetWindow => {
  targetWindow.webContents.send("create-new-workspace");
};

exports.genSaveImage = async (event, imgID, imgPath) => {
  const scribeImgPath = getScribeImgPath(imgID);
  if (fs.existsSync(scribeImgDir)) {
    try {
      await copyFile(imgPath, scribeImgPath);
    } catch (e) {
      console.error("Copying image failed", e);
    }
    event.sender.send("img-saved", scribeImgPath);
    return;
  }
  fs.mkdirSync(scribeImgDir);
  try {
    await copyFile(imgPath, scribeImgPath);
  } catch (e) {
    console.error("Copying image failed", e);
  }
  event.sender.send("img-saved", scribeImgPath);
  return;
};

exports.genSaveWorkspace = (event, workspace, userSelectedDir) => {
  // Check if user is in session and has already selected dir
  if (!userSelectedDir) {
    userSelectedDir = getDirSelectionFromUser(mainWindow);
    userSelectedDir = path.join(userSelectedDir, SCRIBE_FILE_PATHS.SCRIBE_DATA);
  }

  // User cancelled selection
  if (!userSelectedDir) return;
  jsonfile.writeFile(userSelectedDir, workspace, err => {
    if (err) {
      console.error("Directory exists. Could not save workspace", err);
    }
    event.sender.send("save-workspace-notification", userSelectedDir);
  });
};
