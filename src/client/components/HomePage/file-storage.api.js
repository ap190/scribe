import { saveWorkspace, saveFile } from "./ipcRenderer.api";

export const saveSingleFile = componentContext => {
  // Get Current File
  if (!componentContext.state.currentThread) return;
  const { channelId, id } = componentContext.state.currentThread;

  componentContext.saveWorkspace();

  // Read Current File from Map
  const newDocTitle = `${channelId}****${id}`;

  // Remove saved Doc from Cache, perhaps this should be done via setState?
  componentContext.state.unsavedDocCache.delete(newDocTitle);

  componentContext.setState({
    wasDocumentEdited: false
  });
};

export const saveAllFiles = (componentContext, unsavedDocCache) => {
  console.log(componentContext);
};
