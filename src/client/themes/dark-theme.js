import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";
import contentEmbedLight from "../../../public/assets/icons/code.svg";
import editorActionBarSaveLight from "../../../public/assets/icons/save.svg";
import editorActionBarExportLight from "../../../public/assets/icons/export.svg";
import editorActionBarNextLight from "../../../public/assets/icons/next.svg";
import editorActionBarMaximizeLight from "../../../public/assets/icons/maximize.svg";
import folderDark from "../../../public/assets/icons/folder-dark.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import seperatorLight from "../../../public/assets/icons/seperator.svg";
import codeBlockLight from "../../../public/assets/icons/code-block.svg";
import textFile from "../../../public/assets/icons/file-dark.svg";
import circleAdd from "../../../public/assets/icons/circle-add-dark.svg";
import addThread from "../../../public/assets/icons/thread-add-dark.svg";
import deleteThread from "../../../public/assets/icons/delete-thread-dark.svg";
// #519aba
export default {
  icons: {
    addEditor: addEditorLight,
    circleAdd,
    codeBlock: codeBlockLight,
    contentEmbed: contentEmbedLight,
    export: editorActionBarExportLight,
    folder: folderDark,
    imageEmbed: imageEmbedLight,
    imageFile: imageFileLight,
    maximize: editorActionBarMaximizeLight,
    next: editorActionBarNextLight,
    save: editorActionBarSaveLight,
    seperator: seperatorLight,
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
  }
};
