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
      throw new Error("failed to read file");
    }
    event.sender.send("load-file-res", data);
  });
};

exports.loadWorkspace = (targetWindow, dir) => {
  const userSelectedScribePath = createLoadableWorkspacePath(dir);
  if (!userSelectedScribePath || !dir) return;
  if (fs.existsSync(userSelectedScribePath)) {
    jsonfile.readFile(userSelectedScribePath, "utf8", (err, data) => {
      targetWindow.webContents.send(
        "load-file-res",
        data,
        userSelectedScribePath
      );
    });
  }
};

exports.genSaveWorkspace = (event, workspace, userSelectedDir) => {
  // Check if user is in session and has already selected dir
  if (!userSelectedDir) {
    userSelectedDir = getDirSelectionFromUser(mainWindow);
  }

  if (fs.existsSync(userSelectedDir)) {
    jsonfile.writeFile(
      userSelectedDir,
      workspace,
      { spaces: 4 },
      (err, data) => {
        if (err) {
          console.error("Could not save workspace");
        }
      }
    );
  } else {
    fs.mkdir(`${userSelectedDir}/${SCRIBE_FILE_PATHS.SCRIBE_DIR}`, e => {
      jsonfile.writeFile(userSelectedDir, workspace, { spaces: 4 }, err => {
        if (err) {
          console.error("Could not save workspace");
        }
      });
    });
  }
};
