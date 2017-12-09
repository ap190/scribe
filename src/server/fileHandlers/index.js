const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const { SCRIBE_FILE_PATHS } = require("../consts");
const { getDirSelectionFromUserOG } = require("../dialogs");
const { mainWindow } = require("../../electron-main");

const jsonpath = path.join(
  __dirname,
  "../..",
  "data",
  SCRIBE_FILE_PATHS.SCRIBE_DATA
);

exports.genLoadData = event => {
  jsonfile.readFile(jsonpath, "utf8", (err, data) => {
    if (err) {
      throw new Error("failed to read file");
    }
    event.sender.send("load-file-res", data);
  });
};

exports.genSaveWorkspace = (event, workspace, userSelectedDir) => {
  if (!userSelectedDir) {
    userSelectedDir = getDirSelectionFromUserOG(mainWindow);
    console.log(userSelectedDir);
  }
  if (
    fs.existsSync(
      `${userSelectedDir}/${SCRIBE_FILE_PATHS.SCRIBE_DIR}/${
        SCRIBE_FILE_PATHS.SCRIBE_DATA
      }`
    )
  ) {
    jsonfile.writeFile(
      `${userSelectedDir}/scribe/scribe.json`,
      workspace,
      { spaces: 4 },
      (err, data) => {
        console.error(err);
      }
    );
  }
};

// jsonfile.writeFile(jsonpath, workspace, { spaces: 4 }, (err, data) => {
//   if (err) {
//     throw new Error("Could not save workspace");
//   }
//   event.sender.send("save-workspace-res", "success saving");
// });
