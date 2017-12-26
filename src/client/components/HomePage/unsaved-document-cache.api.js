const setDocument = (title, content, unsavedDocs) =>
  unsavedDocs.set(title, content);

const getDocument = (title, unsavedDocs) => unsavedDocs.get(title);

export const getDocumentTitles = unsavedDocs => unsavedDocs.keys();

export const doesDocumentExist = (title, unsavedDocs) => unsavedDocs.has(title);

const getCacheSize = unsavedDocs => unsavedDocs.size;

const clearCache = unsavedDocs => unsavedDocs.clear();

const documentDiff = (title, document, unsavedDocs) =>
  getDocument(title, unsavedDocs) !== document;

export const fetchIfDocumentExists = (newlySelectedThread, unsavedDocs) => {
  const { channelId, id } = newlySelectedThread;
  const newlySelectedDocTitle = `${channelId}****${id}`;
  if (doesDocumentExist(newlySelectedDocTitle, unsavedDocs)) {
    return getDocument(newlySelectedDocTitle, unsavedDocs);
  }
  return null;
};

export const updateCacheIfNew = (document, thread, unsavedDocs) => {
  if (!document || !thread) return unsavedDocs;
  const { channelId, id } = thread;
  const documentTitle = `${channelId}****${id}`;
  if (documentDiff(documentTitle, document, unsavedDocs)) {
    return setDocument(documentTitle, document, unsavedDocs);
  }
  return unsavedDocs;
};
