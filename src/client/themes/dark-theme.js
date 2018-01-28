import addEditorDark from "../../../public/assets/icons/add-editor-dark.svg";
import contentEmbedDark from "../../../public/assets/icons/embed-content-dark.svg";
import editorActionBarSaveDark from "../../../public/assets/icons/save-dark.svg";
import editorActionBarExportDark from "../../../public/assets/icons/export-dark.svg";
import editorActionBarNextDark from "../../../public/assets/icons/next-dark.svg";
import editorActionBarMaximizeDark from "../../../public/assets/icons/full-screen-dark.svg";
import folderDark from "../../../public/assets/icons/folder-dark.svg";
import imageEmbedDark from "../../../public/assets/icons/image-dark.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import seperatorDark from "../../../public/assets/icons/separator-dark.svg";
import codeBlockDark from "../../../public/assets/icons/code-dark.svg";
import textFile from "../../../public/assets/icons/file-dark.svg";
import circleAdd from "../../../public/assets/icons/circle-add-dark.svg";
import addThread from "../../../public/assets/icons/thread-add-dark.svg";
import deleteThread from "../../../public/assets/icons/delete-thread-dark.svg";
// #519aba
// #554475
export default {
  icons: {
    addEditor: addEditorDark,
    circleAdd,
    codeBlock: codeBlockDark,
    contentEmbed: contentEmbedDark,
    export: editorActionBarExportDark,
    folder: folderDark,
    imageEmbed: imageEmbedDark,
    imageFile: imageFileLight,
    maximize: editorActionBarMaximizeDark,
    next: editorActionBarNextDark,
    save: editorActionBarSaveDark,
    seperator: seperatorDark,
    textFile,
    addThread
  },
  columnFooter: {
    backgroundColor: "#28223C",
    color: "#B0B1B9"
  },
  aside: {
    userAvatar: {
      backgroundImage:
        "linear-gradient(#212225, #212225), radial-gradient(circle at top left, #1d2671, #a869ff)",
      color: "#B0B1B9",
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
        backgroundColor: "#27282B",
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
    backgroundColor: "#27282B",
    textColor: "#57595D"
  },
  threads: {
    backgroundColor: "#212225",
    color: "#B0B1B9",
    search: {
      backgroundColor: "#35363B",
      color: "#B0B1B9"
    },
    deleteThread
  },
  editor: { backgroundColor: "#212225", color: "#B0B1B9" },
  editedNotif: { color: "#a869ff", border: "1px solid #a869ff" },
  helpButton: { color: "#B3B3B3", border: "1px double #B3B3B3" },
  floatingButton: { background: "#212225", border: "1px solid #B0B1B9" }
};
