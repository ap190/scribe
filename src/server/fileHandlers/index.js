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
  return path.join(
    userSelectedDir,
    SCRIBE_FILE_PATHS.SCRIBE_DIR,
    SCRIBE_FILE_PATHS.SCRIBE_DATA
  );
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

exports.genSaveWorkspace = (event, workspace, userSelectedDir) => {
  // Check if user is in session and has already selected dir
  if (!userSelectedDir) {
    userSelectedDir = getDirSelectionFromUser(mainWindow);
  }

  // User cancelled selection
  if (!userSelectedDir) return;

  const userPathJoined = path.join(
    userSelectedDir,
    SCRIBE_FILE_PATHS.SCRIBE_DIR,
    SCRIBE_FILE_PATHS.SCRIBE_DATA
  );

  if (fs.existsSync(path.join(userSelectedDir, SCRIBE_FILE_PATHS.SCRIBE_DIR))) {
    console.log(`Dir does exist ${userSelectedDir}`);
    jsonfile.writeFile(userPathJoined, workspace, err => {
      console.log(`user path joined ${userPathJoined}`);
      if (err) {
        console.error("Directory exists. Could not save workspace", err);
      }
      event.sender.send("save-workspace-notification", userPathJoined);
    });
  } else {
    console.log(`Dir does not exist ${userSelectedDir}`);
    fs.mkdir(`${userSelectedDir}/${SCRIBE_FILE_PATHS.SCRIBE_DIR}`, e => {
      jsonfile.writeFile(userSelectedDir, workspace, { spaces: 4 }, err => {
        if (err) {
          console.error(
            "Directory does not exist. Could not save workspace",
            err
          );
        }
        event.sender.send("save-workspace-notification", userSelectedDir);
      });
    });
  }
};
