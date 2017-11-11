const { dialog, app } = require("electron");
const fs = require("fs");
const getAllFiles = require("./fetchDirsStructure").getAllFiles;

const getFileSelectionFromUser = targetWindow => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ["openFile"]
  });

  if (!files) return null; // user cancelled file selection

  return files[0];
};

exports.openFile = (targetWindow, filePath) => {
  const file = filePath || getFileSelectionFromUser(targetWindow);
  if (!file) return;
  const content = fs.readFileSync(file).toString();

  app.addRecentDocument(file);
  targetWindow.webContents.send("file-opened", file, content);
  targetWindow.setRepresentedFilename(file); // cmd click on app icon scroll down of tree structure effect
};

exports.getDirSelectionFromUser = targetWindow => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ["openDirectory"]
  });

  if (!files) return null; // user cancelled file selection
  return {
    fileStructure: getAllFiles(files[0]),
    relativePath: files[0].split("/").slice(1),
    absolutePath: files[0]
  };
};
