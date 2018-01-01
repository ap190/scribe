import moment from "moment";
import { updateCacheIfNew } from "./unsaved-document-cache.api";
import { saveWorkspace } from "./ipcRenderer.api";

const SELECTED_THREAD = -1;

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

  // Save currently selected file
  componentContext.state.currentDocument &&
    componentContext.handleDocumentChange(
      componentContext.state.currentDocument
    );

  // Update thread UI
  const timestamp = moment().format("LLLL");
  componentContext.applyThreadChange(SELECTED_THREAD, thread => {
    return {
      ...thread,
      date: timestamp,
      text: thread.document ? thread.document.blocks[0].text : ""
    };
  });

  // Save to disk via IPCRenderer
  saveWorkspace(
    componentContext.state.channels,
    componentContext.state.userSelectedDir
  );

  // Remove saved Doc from Cache, perhaps this should be done via setState?
  const newDocTitle = `${channelId}****${id}`;
  componentContext.state.unsavedDocCache.delete(newDocTitle);

  componentContext.setState({
    wasDocumentEdited: false
  });
};

export const saveAllFiles = componentContext => {
  // Update cache wih selected file
  const { currentDocument, currentThread } = componentContext.state;
  let { unsavedDocCache } = componentContext.state;

  // Update cache with previous doc before switching to new doc
  if (currentDocument && currentThread) {
    unsavedDocCache = updateCacheIfNew(
      currentDocument,
      currentThread,
      unsavedDocCache
    );
  }

  // Save cached docs
  console.log("#######");
  console.log(unsavedDocCache);
  unsavedDocCache.forEach((val, key) => {
    const { channelId, id } = deconstructChannelAndThreadIDFromDocName(key);
    componentContext.handleDocumentChange(val, channelId, id);
  });

  // SaveWorkspace via IPC
  saveWorkspace(
    componentContext.state.channels,
    componentContext.state.userSelectedDir
  );

  // Reset Map
  componentContext.setState({
    wasDocumentEdited: false,
    unsavedDocCache: new Map()
  });
};
