const { ipcMain, app } = require("electron");
const { autoUpdater } = require("electron-updater");
const cmd = require("node-cmd");
const { saveBeforeExiting } = require("../dialogs");
const {
  genSaveWorkspace,
  genLoadData,
  genFetchFileContent,
  genSaveImage
} = require("../fileHandlers");
const { genExportCurrentDocument, genExportToMD } = require("../export");

exports.setIPCListeners = mainWindow => {
  ipcMain.on("load-file-req", event => genLoadData(event));

  ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.on("fetch-file", (event, filePath) =>
    genFetchFileContent(event, filePath)
  );

  ipcMain.on("export-current-doc", (event, html, pdfName) =>
    genExportCurrentDocument(event, html, pdfName)
  );

  ipcMain.on("export-to-md", (event, md, pdfname) => {
    genExportToMD(event, md, pdfname);
  });

  ipcMain.on("launch-vs-code", (event, projectPath) => {
    console.log(projectPath);
    cmd.run(`code ${projectPath}`);
  });

  ipcMain.on("check-for-unsaved-work", (event, page) => {
    if (page === "LOGIN") {
      app.exit();
      return;
    }
    saveBeforeExiting(mainWindow);
  });

  ipcMain.on("save-workspace", (event, workspace, userSelectedDir) =>
    genSaveWorkspace(event, workspace, userSelectedDir)
  );

  ipcMain.on("save-img", (event, imgID, imgPath) =>
    genSaveImage(event, imgID, imgPath)
  );

  ipcMain.addListener("quit-app", event => {
    // app.quit();
  });
};
