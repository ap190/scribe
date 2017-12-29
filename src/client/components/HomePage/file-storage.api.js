import { saveWorkspace, saveFile } from "./ipcRenderer.api";

const deconstructChannelAndThreadIDFromDocName = docName => {
  const channelId = docName.substr(0, docName.indexOf("****"));
  const id = docName.substr(docName.indexOf("****") + 4, docName.length);
  return {
    channelId,
    id
  };
};

export const saveSingleFile = componentContext => {
  // Get Current File
  if (!componentContext.state.currentThread) return;
  const { channelId, id } = componentContext.state.currentThread;

  componentContext.saveWorkspace();

  const newDocTitle = `${channelId}****${id}`;

  // Remove saved Doc from Cache, perhaps this should be done via setState?
  componentContext.state.unsavedDocCache.delete(newDocTitle);

  componentContext.setState({
    wasDocumentEdited: false
  });
};

export const saveAllFiles = componentContext => {
  componentContext.state.unsavedDocCache.forEach((val, key) => {
    const { channelId, id } = deconstructChannelAndThreadIDFromDocName(key);
    componentContext.handleDocumentChange(val, channelId, id);
  });
};
