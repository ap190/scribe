import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";
import contentEmbedLight from "../../../public/assets/icons/code.svg";
import editorActionBarSaveLight from "../../../public/assets/icons/save.svg";
import editorActionBarExportLight from "../../../public/assets/icons/export.svg";
import editorActionBarNextLight from "../../../public/assets/icons/next.svg";
import editorActionBarMaximizeLight from "../../../public/assets/icons/maximize.svg";
import folderLight from "../../../public/assets/icons/folder-light.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import notifIcon from "../../../public/assets/rich-notifications/disk.png";
import seperatorLight from "../../../public/assets/icons/seperator.svg";
import textFileLight from "../../../public/assets/icons/text-file-light.svg";

exports.modals = {
  ASIDE_CREATE_CHANNEL_MODAL: "aside_create_channel_modal",
  EMBED_CONTENT_MODAL: "embed_content_modal",
  HIGHLIGHT_THREAD_MODAL: "highlight_thread_modal"
};

exports.stringConstants = {
  ADD_A_THREAD: "Add a thread"
};

exports.notifications = {
  SAVE_DOCUMENT_BASIC: {
    title: "Basic Notification",
    body: "Short message part"
  },
  SAVE_DOCUMENT_RICH: {
    title: "Document Saved",
    body: "Synced with cloud service",
    icon: notifIcon
  }
};

exports.graphCoolConstants = {
  GC_USER_ID: "graphcool-user-id",
  GC_AUTH_TOKEN: "graphcool-auth-token"
};

exports.lightTheme = {
  icons: {
    addEditor: addEditorLight,
    contentEmbed: contentEmbedLight,
    export: editorActionBarExportLight,
    folder: folderLight,
    imageEmbed: imageEmbedLight,
    imageFile: imageFileLight,
    maximize: editorActionBarMaximizeLight,
    next: editorActionBarNextLight,
    save: editorActionBarSaveLight,
    seperator: seperatorLight,
    textFile: textFileLight
  }
};
