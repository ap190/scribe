class UnsavedDocumentCacheAPI {
  constructor() {
    this.unsavedDocs = new Map();
    this.setDocument = this.setDocument.bind(this);
    this.getDocument = this.getDocument.bind(this);
    this.getDocumentTitles = this.getDocumentTitles.bind(this);
    this.doesDocumentExist = this.doesDocumentExist.bind(this);
    this.getCacheSize = this.getCacheSize.bind(this);
    this.clearCache = this.clearCache.bind(this);
  }

  setDocument(title, content) {
    this.unsavedDocs.set(title, content);
    return this;
  }

  getDocument(title) {
    return this.unsavedDocs.get(title);
  }

  getDocumentTitles() {
    return this.unsavedDocs.keys();
  }

  doesDocumentExist(title) {
    return this.unsavedDocs.has(title);
  }

  getCacheSize() {
    return this.unsavedDocs.size;
  }

  clearCache() {
    this.unsavedDocs.clear();
    return this;
  }
}

export default UnsavedDocumentCacheAPI;
