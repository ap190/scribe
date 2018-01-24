import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";
import contentEmbedLight from "../../../public/assets/icons/embed-content-dark.svg";
import editorActionBarSaveDark from "../../../public/assets/icons/save-dark.svg";
import editorActionBarExportDark from "../../../public/assets/icons/export-dark.svg";
import editorActionBarNextDark from "../../../public/assets/icons/next-dark.svg";
import editorActionBarMaximizeDark from "../../../public/assets/icons/full-screen-dark.svg";
import folderDark from "../../../public/assets/icons/folder-dark.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import seperatorDark from "../../../public/assets/icons/separator-dark.svg";
import codeBlockDark from "../../../public/assets/icons/code-dark.svg";
import textFile from "../../../public/assets/icons/file-dark.svg";
import circleAdd from "../../../public/assets/icons/circle-add-dark.svg";
import addThread from "../../../public/assets/icons/thread-add-dark.svg";
import deleteThread from "../../../public/assets/icons/delete-thread-dark.svg";
// #519aba
export default {
  icons: {
    addEditor: addEditorLight,
    circleAdd,
    codeBlock: codeBlockDark,
    contentEmbed: contentEmbedLight,
    export: editorActionBarExportDark,
    folder: folderDark,
    imageEmbed: imageEmbedLight,
    imageFile: imageFileLight,
    maximize: editorActionBarMaximizeDark,
    next: editorActionBarNextDark,
    save: editorActionBarSaveDark,
    seperator: seperatorDark,
    textFile,
    addThread
  },
  columnFooter: {
    backgroundColor: "#131519",
    color: "#B0B1B9"
  },
  aside: {
    userAvatar: {
      backgroundImage:
        "linear-gradient(#f2f2f2, #f2f2f2), radial-gradient(circle at top left, #1d2671, #c33764)",
      userDetails: {
        color: "#B0B1B9"
      }
    },
    channels: {
      header: {
        color: "#B0B1B9"
      },
      channel: {
        color: "#B0B1B9"
      }
    },
    contextMenu: {
      backgroundColor: "#323747"
    },
    fileTree: {
      container: {
        backgroundColor: "#16191E",
        color: "#57595d"
      },
      header: {
        color: "#5759fd"
      },
      node: {
        color: "#B0B1B9",
        caret: "#B0B1B9",
        folderIcon: "",
        fileIcon: ""
      },
      folder: {
        icon: folderDark
      }
    },
    backgroundColor: "#16191E",
    textColor: "#57595D"
  },
  threads: {
    backgroundColor: "#16191E",
    color: "#B0B1B9",
    search: {
      backgroundColor: "#343537",
      color: "#B0B1B9"
    },
    deleteThread
  },
  editor: { backgroundColor: "#16191E", color: "#B0B1B9" },
  editedNotif: { color: "#a869ff", border: "1px solid #a869ff" },
  helpButton: { color: "#a869ff", border: "1px double #a869ff" }
};
