import addEditorLight from "../../../public/assets/icons/add-editor-light.svg";
import contentEmbedLight from "../../../public/assets/icons/code.svg";
import editorActionBarSaveLight from "../../../public/assets/icons/save.svg";
import editorActionBarExportLight from "../../../public/assets/icons/export.svg";
import editorActionBarNextLight from "../../../public/assets/icons/next.svg";
import editorActionBarMaximizeLight from "../../../public/assets/icons/maximize.svg";
import folderLight from "../../../public/assets/icons/folder-light.svg";
import imageEmbedLight from "../../../public/assets/icons/image.svg";
import imageFileLight from "../../../public/assets/icons/image-file-light.svg";
import seperatorLight from "../../../public/assets/icons/seperator.svg";
import codeBlockLight from "../../../public/assets/icons/code-block.svg";
import textFileLight from "../../../public/assets/icons/text-file-light.svg";

export default {
  icons: {
    addEditor: addEditorLight,
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
    textFile: textFileLight
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
        caret: "#000000"
      }
    },
    backgroundColor: "#f2f2f2",
    textColor: "#000000"
  }
};
