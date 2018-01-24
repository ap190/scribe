import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";
import contentEmbedLight from "../../../public/assets/icons/embed-content-light.svg";
import editorActionBarSaveLight from "../../../public/assets/icons/save.svg";
import editorActionBarExportLight from "../../../public/assets/icons/export.svg";
import editorActionBarNextLight from "../../../public/assets/icons/next.svg";
import editorActionBarMaximizeLight from "../../../public/assets/icons/maximize.svg";
import folderLight from "../../../public/assets/icons/folder-light.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import seperatorLight from "../../../public/assets/icons/seperator.svg";
import codeBlockLight from "../../../public/assets/icons/code.svg";
import textFileLight from "../../../public/assets/icons/text-file-light.svg";
import circleAdd from "../../../public/assets/icons/circle-add-light.svg";
import addThread from "../../../public/assets/icons/thread-add-light.svg";
import deleteThread from "../../../public/assets/icons/delete-thread-light.svg";

export default {
  icons: {
    addEditor: addEditorLight,
    circleAdd,
    codeBlock: codeBlockLight,
    contentEmbed: contentEmbedLight,
    export: editorActionBarExportLight,
    folder: folderLight,
    imageEmbed: imageEmbedLight,
    imageFile: imageFileLight,
    maximize: editorActionBarMaximizeLight,
    next: editorActionBarNextLight,
    save: editorActionBarSaveLight,
    seperator: seperatorLight,
    textFile: textFileLight,
    addThread
  },
  columnFooter: {
    backgroundColor: "#e0e6f6"
  },
  aside: {
    userAvatar: {
      color: "#000000",
      backgroundImage:
        "linear-gradient(#f2f2f2, #f2f2f2), radial-gradient(circle at top left, #1d2671, #c33764)", // not working
      userDetails: {
        color: "#000000"
      }
    },
    channels: {
      header: {
        color: "#000000"
      },
      channel: {
        color: "#000000"
      }
    },
    contextMenu: {
      backgroundColor: "#e0e6f6"
    },
    fileTree: {
      container: {
        backgroundColor: "#f2f2f2",
        color: "#000000"
      },
      header: {
        color: "#5759fd"
      },
      node: {
        color: "#000000",
        caret: "#000000",
        folderIcon: "",
        fileIcon: ""
      },
      folder: {
        icon: folderLight
      }
    },
    backgroundColor: "#f2f2f2",
    textColor: "#000000"
  },
  threads: {
    backgroundColor: "white",
    color: "#000",
    search: {
      backgroundColor: "#F2F2F2",
      color: "#000"
    },
    deleteThread
  },
  editor: { backgroundColor: "#fff", color: "#000" },
  editedNotif: { color: " #49306b", border: "1px solid #49306b" },
  helpButton: { color: " #49306b", border: "1px double #49306b" },
  floatingButton: { background: "#fff" }
};
