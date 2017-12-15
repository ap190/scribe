const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const { SCRIBE_FILE_PATHS } = require("../consts");
const { getDirSelectionFromUser } = require("../dialogs");
const { mainWindow } = require("../../electron-main");

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
  console.log("#############");
  console.log(userSelectedScribePath);
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

exports.genSaveWorkspace = (event, workspace, userSelectedDir) => {
  // Check if user is in session and has already selected dir
  if (!userSelectedDir) {
    userSelectedDir = getDirSelectionFromUser(mainWindow);
    userSelectedDir = path.join(userSelectedDir, SCRIBE_FILE_PATHS.SCRIBE_DATA);
  }

  // User cancelled selection
  if (!userSelectedDir) return;
  console.log("*******************");
  console.log(userSelectedDir);
  console.log(workspace);
  jsonfile.writeFile(userSelectedDir, workspace, err => {
    if (err) {
      console.error("Directory exists. Could not save workspace", err);
    }
    event.sender.send("save-workspace-notification", userSelectedDir);
  });
};
