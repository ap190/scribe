const { ipcMain, app } = require("electron");
const { saveBeforeExiting } = require("../dialogs");
const {
  genSaveWorkspace,
  genLoadData,
  genFetchFileContent,
  genSaveImage,
  genFBLogin
} = require("../fileHandlers");
const { genExportCurrentDocument } = require("../export");

exports.setIPCListeners = mainWindow => {
  ipcMain.on("load-file-req", event => genLoadData(event));

  ipcMain.on("login-with-fb", event => genFBLogin(event, mainWindow));

  ipcMain.on("fetch-file", (event, filePath) =>
    genFetchFileContent(event, filePath)
  );

  ipcMain.on("export-current-doc", (event, html, pdfName) =>
    genExportCurrentDocument(event, html, pdfName)
  );

  ipcMain.on("check-for-unsaved-work", (event, everythingIsSaved) => {
    if (everythingIsSaved) {
      app.exit();
    }
    // TODO: this crashes app
    saveBeforeExiting(mainWindow);
  });

  ipcMain.on("save-workspace", (event, workspace, userSelectedDir) =>
    genSaveWorkspace(event, workspace, userSelectedDir)
  );

  ipcMain.on("save-img", (event, imgID, imgPath) =>
    genSaveImage(event, imgID, imgPath)
  );
};
