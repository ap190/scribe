import { convertToRaw } from "draft-js";
import stateToMarkdown from "../EditorColumn/Editor/export/exportToMarkdown";
import { setRenderOptions } from "../EditorColumn/Editor/export/exportToHTML";

const electron = window.require("electron");
const { ipcRenderer } = electron;

export const exportCurrentDocAsHTML = (content, title) => {
  const HTML = setRenderOptions()(convertToRaw(content));
  ipcRenderer.send("export-current-doc", HTML, title);
};

export const exportCurrentDocAsMarkdown = (content, title) => {
  ipcRenderer.send("export-to-md", stateToMarkdown(content, title), title);
};
