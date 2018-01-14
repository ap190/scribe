import saveIcon from "../../../public/assets/rich-notifications/disk.png";
import imagePastedIcon from "../../../public/assets/rich-notifications/image.png";
import textPastedIcon from "../../../public/assets/rich-notifications/text.png";

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
    icon: saveIcon
  },
  IMAGE_PASTED: {
    title: "Image Pasted",
    body: "Image was exported to document",
    icon: imagePastedIcon
  },
  TEXT_PASTED: {
    title: "Text Pasted",
    body: "Text was exported to document",
    icon: textPastedIcon
  }
};

exports.graphCoolConstants = {
  GC_USER_ID: "graphcool-user-id",
  GC_AUTH_TOKEN: "graphcool-auth-token"
};
