const { dialog, nativeImage, app } = require("electron");
const fs = require("fs");
const path = require("path");
const getAllFiles = require("../utils/fetchDirsStructure").getAllFiles;

const getFileSelectionFromUser = targetWindow => {
  const files = dialog.showOpenDialog(targetWindow, {
    properties: ["openFile"]
  });

  if (!files) return null; // user cancelled file selection

  return files[0];
};

const showMessage = browserWindow => {
  dialog.showMessageBox(
    browserWindow,
    {
      type: "info", // Windows sets different icons depending on this (if icon is unset)
      icon: nativeImage.createFromPath(
        "../../../build/assets/rich-notifications/icon.png"
      ), // ignored on Windows
      // title: 'Hello', //this isn't shown on MacOS, but is on Windows. If blank, it's your app name on Windows
      message: "Hello",
      detail: "Just a friendly meow.",
      buttons: ["Meow", "Close"], // can pass multiple buttons in here and then get the index of the clicked on in the callback
      defaultId: 0
    },
    clickedIndex => {
      console.log(clickedIndex);
    }
  );
};

const showSaveDialog = browserWindow => {
  dialog.showSaveDialog(
    browserWindow,
    {
      defaultPath: path.join(app.getPath("downloads"), "memory-info.txt")
    },
    filename => {
      if (filename) {
        const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
        fs.writeFile(filename, memInfo, "utf8", err => {
          if (err) {
            dialog.showErrorBox("Save failed.", err.message);
          }
        });
      }
    }
  );
};

const getDirSelectionFromUser = targetWindow => {
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

const showOpenDialog = browserWindow => {
  dialog.showOpenDialog(
    browserWindow,
    {
      defaultPath: app.getPath("downloads"),
      filters: [{ name: "Text Files", extensions: ["txt"] }] //"Text Files" displays on Windows in lower right, but not on Mac
    },
    filepaths => {
      if (filepaths) {
        console.log(filepaths, fs.readFileSync(filepaths[0], "utf8"));
      }
    }
  );
};

const openFile = (targetWindow, filePath) => {
  const file = filePath || getFileSelectionFromUser(targetWindow);
  if (!file) return;
  const content = fs.readFileSync(file).toString();

  app.addRecentDocument(file);
  targetWindow.webContents.send("file-opened", file, content);
  targetWindow.setRepresentedFilename(file); // cmd click on app icon scroll down of tree structure effect
};

module.exports = {
  showSaveDialog,
  showMessage,
  showOpenDialog,
  getFileSelectionFromUser,
  getDirSelectionFromUser,
  openFile
};
