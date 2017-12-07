import notifIcon from "../../../public/assets/rich-notifications/icon.png";

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
