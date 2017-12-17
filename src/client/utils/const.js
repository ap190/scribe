import notifIcon from "../../../public/assets/rich-notifications/disk.png";
import seperatorLight from "../../../public/assets/icons/seperator.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import contentEmbedLight from "../../../public/assets/icons/code.svg";
import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";

exports.modals = {
  ASIDE_CREATE_CHANNEL_MODAL: "aside_create_channel_modal",
  HIGHLIGHT_THREAD_MODAL: "highlight_thread_modal",
  EMBED_CONTENT_MODAL: "embed_content_modal"
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
    contentEmbed: contentEmbedLight,
    imageEmbed: imageEmbedLight,
    seperator: seperatorLight,
    addEditor: addEditorLight
  }
};
