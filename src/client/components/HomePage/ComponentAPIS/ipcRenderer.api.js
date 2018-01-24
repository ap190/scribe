import { notifications } from "../../../utils/const";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const saveFile = (fileName, userSelectedDir, channels) =>
  ipcRenderer.send("save-document", channels, userSelectedDir);

export const saveWorkspace = (channels, userSelectedDir) =>
  ipcRenderer.send("save-workspace", channels, userSelectedDir);

export const initIpcRenderer = componentContext => {
  ipcRenderer.removeAllListeners("check-for-unsaved-work");
  ipcRenderer.send("load-file-req");

  ipcRenderer.on("load-file-res", (event, channels, userSelectedDir) => {
    componentContext.setState({
      channels,
      userSelectedDir
    });
  });

  ipcRenderer.on("create-new-workspace", () => {
    componentContext.setState({ channels: [] });
  });

  ipcRenderer.on("before-quit-check", () => {
    console.log("before-quit check yallllll");
  });

  ipcRenderer.on("auto-update", (event, text) => console.log(`${text}`));

  ipcRenderer.on("toggle-dark-theme", () => {
    componentContext.setState({
      darkTheme: !componentContext.state.darkTheme
    });
  });

  ipcRenderer.on("create-new-clipping", (event, copiedText) => {
    componentContext.handleAddTextWrapper(copiedText);
  });

  ipcRenderer.on("create-new-img-clipping", (event, copiedImg) => {
    componentContext.handleAddImageWrapper(copiedImg);
  });

  ipcRenderer.on("img-saved", (event, filePath) => {
    componentContext.handleAddImage(filePath);
  });

  ipcRenderer.on("sync-to-cloud", (event, files) =>
    componentContext.uploadFile(files)
  );

  ipcRenderer.on("delete-channel", (event, params) => {
    const idToDelete = params.titleText.split(" ")[1];
    const newChannels = componentContext.state.channels.filter(
      channel => channel.id !== idToDelete
    );
    componentContext.setState({ channels: newChannels });
  });

  ipcRenderer.on("check-for-unsaved-work", event => {
    console.log(
      "CHECKING FOR UNSAVED WORK....",
      componentContext.state.unsavedDocCache.size
    );
    ipcRenderer.send("check-for-unsaved-work", "HOME");
  });

  ipcRenderer.on("fetch-file-content-res", (event, file) => {
    const updatedMap = componentContext.state.currentFiles.set(
      `${file.filePath}`,
      `${file.data}`
    );
    componentContext.setState({ currentFiles: updatedMap });
  });

  ipcRenderer.on("save-workspace", () => {
    console.log("save-workspace ipc gets fired");
    componentContext.saveWorkspace();
  });

  ipcRenderer.on("save-workspace-notification", (event, userSelectedDir) => {
    componentContext.setState({ userSelectedDir });
    new Notification(
      notifications.SAVE_DOCUMENT_RICH.title,
      notifications.SAVE_DOCUMENT_RICH
    );
  });
};
