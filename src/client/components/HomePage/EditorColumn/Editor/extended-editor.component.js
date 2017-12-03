import PropTypes from "prop-types";
/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils
} from "draft-js";

import "draft-js/dist/Draft.css";
import "hint.css/hint.min.css";

import "./index.scss";
import "./components/toolbar/addbutton.scss";
import "./components/toolbar/toolbar.scss";
import "./components/blocks/text.scss";
import "./components/blocks/atomic.scss";
import "./components/blocks/blockquotecaption.scss";
import "./components/blocks/caption.scss";
import "./components/blocks/todo.scss";
import "./components/blocks/image.scss";

import {
  Editor,
  StringToTypeMap,
  Block,
  keyBindingFn,
  createEditorState,
  addNewBlockAt,
  beforeInput,
  getCurrentBlock,
  AtomicEmbedComponent,
  AtomicBlock,
  ImageSideButton,
  SeparatorSideButton,
  EmbedSideButton,
  rendererFn,
  HANDLED,
  NOT_HANDLED
} from "./index";

import {
  setRenderOptions,
  blockToHTML,
  entityToHTML,
  styleToHTML
} from "./exporter";

const newTypeMap = StringToTypeMap;
newTypeMap["2."] = Block.OL;

const { hasCommandModifier } = KeyBindingUtil;
const DQUOTE_START = "“";
const DQUOTE_END = "”";
const SQUOTE_START = "‘";
const SQUOTE_END = "’";

// seems to be for the renderHTML functionality
const newBlockToHTML = block => {
  const blockType = block.type;
  if (block.type === Block.ATOMIC) {
    if (block.text === "E") {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: "</figure>"
      };
    } else if (block.text === "-") {
      return (
        <div className="md-block-atomic md-block-atomic-break">
          <hr />
        </div>
      );
    }
  }
  return blockToHTML(block);
};

const newEntityToHTML = (entity, originalText) => {
  if (entity.type === "embed") {
    return (
      <div>
        <a
          className="embedly-card"
          href={entity.data.url}
          data-card-controls="0"
          data-card-theme="dark"
        >
          Embedded ― {entity.data.url}
        </a>
      </div>
    );
  }
  return entityToHTML(entity, originalText);
};

const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === "'") {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(
        EditorState.push(
          editorState,
          Modifier.insertText(
            contentState,
            selectionState,
            str === '"' ? DQUOTE_START : SQUOTE_START
          ),
          "transpose-characters"
        )
      );
      return HANDLED;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== " ") {
        onChange(
          EditorState.push(
            editorState,
            Modifier.insertText(
              contentState,
              selectionState,
              str === '"' ? DQUOTE_END : SQUOTE_END
            ),
            "transpose-characters"
          )
        );
      } else {
        onChange(
          EditorState.push(
            editorState,
            Modifier.insertText(
              contentState,
              selectionState,
              str === '"' ? DQUOTE_START : SQUOTE_START
            ),
            "transpose-characters"
          )
        );
      }
      return HANDLED;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};

const AtomicSeparatorComponent = props => <hr />;

class ExtendedEdtior extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(),
      editorEnabled: true,
      placeholder: "Write here..."
    };

    this.onChange = (editorState, callback = null) => {
      if (this.state.editorEnabled) {
        this.setState({ editorState }, () => {
          if (callback) {
            callback();
          }
        });
      }
    };

    this.sideButtons = [
      {
        title: "Image",
        component: ImageSideButton
      },
      {
        title: "Embed",
        component: EmbedSideButton
      },
      {
        title: "Separator",
        component: SeparatorSideButton
      }
    ];

    this.exporter = setRenderOptions({
      styleToHTML,
      blockToHTML: newBlockToHTML,
      entityToHTML: newEntityToHTML
    });

    this.getEditorState = () => this.state.editorState;

    this.logData = this.logData.bind(this);
    this.renderHTML = this.renderHTML.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.loadSavedData = this.loadSavedData.bind(this);
    this.keyBinding = this.keyBinding.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleDroppedFiles = this.handleDroppedFiles.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  rendererFn(setEditorState, getEditorState) {
    const atomicRenderers = {
      embed: AtomicEmbedComponent,
      separator: AtomicSeparatorComponent
    };
    const rFnOld = rendererFn(setEditorState, getEditorState);
    const rFnNew = contentBlock => {
      const type = contentBlock.getType();
      switch (type) {
        case Block.ATOMIC:
          return {
            component: AtomicBlock,
            editable: false,
            props: {
              components: atomicRenderers,
              getEditorState
            }
          };
        default:
          return rFnOld(contentBlock);
      }
    };
    return rFnNew;
  }

  keyBinding(e) {
    if (hasCommandModifier(e)) {
      if (e.which === 83) {
        /* Key S */
        return "editor-save";
      }
      // else if (e.which === 74 /* Key J */) {
      //  return 'do-nothing';
      //}
    }
    if (e.altKey === true) {
      if (e.shiftKey === true) {
        switch (e.which) {
          /* Alt + Shift + L */
          case 76:
            return "load-saved-data";
          /* Key E */
          // case 69: return 'toggle-edit-mode';
        }
      }
      if (e.which === 72 /* Key H */) {
        return "toggleinline:HIGHLIGHT";
      }
    }
    return keyBindingFn(e);
  }

  handleKeyCommand(command) {
    if (command === "editor-save") {
      window.localStorage["editor"] = JSON.stringify(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      return true;
    } else if (command === "load-saved-data") {
      this.loadSavedData();
      return true;
    } else if (command === "toggle-edit-mode") {
      this.toggleEdit();
    }
    return false;
  }

  logData(e) {
    const currentContent = this.state.editorState.getCurrentContent();
    const es = convertToRaw(currentContent);
    console.log(es);
    console.log(this.state.editorState.getSelection().toJS());
  }

  renderHTML(e) {
    const currentContent = this.state.editorState.getCurrentContent();
    const eHTML = this.exporter(currentContent);
    var newWin = window.open(
      `${window.location.pathname}rendered.html`,
      "windowName",
      `height=${window.screen.height},width=${window.screen.wdith}`
    );
    // passes rendered html to new window
    newWin.onload = () => newWin.postMessage(eHTML, window.location.origin);
  }

  loadSavedData() {
    const data = window.localStorage.getItem("editor");
    if (data === null) {
      return;
    }
    try {
      const blockData = JSON.parse(data);
      console.log(blockData);
      this.onChange(
        EditorState.push(this.state.editorState, convertFromRaw(blockData))
      );
    } catch (e) {
      console.log(e);
    }
  }

  toggleEdit(e) {
    this.setState({
      editorEnabled: !this.state.editorEnabled
    });
  }

  handleDroppedFiles(selection, files) {
    const file = files[0];
    if (file.type.indexOf("image/") === 0) {
      // eslint-disable-next-line no-undef
      const src = URL.createObjectURL(file);
      this.onChange(
        addNewBlockAt(
          this.state.editorState,
          selection.getAnchorKey(),
          Block.IMAGE,
          {
            src
          }
        )
      );
      return HANDLED;
    }
    return NOT_HANDLED;
  }

  handleReturn(e) {
    return NOT_HANDLED;
  }

  render() {
    const { editorState, editorEnabled } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        editorEnabled={editorEnabled}
        handleDroppedFiles={this.handleDroppedFiles}
        handleKeyCommand={this.handleKeyCommand}
        placeholder={this.state.placeholder}
        keyBindingFn={this.keyBinding}
        beforeInput={handleBeforeInput}
        handleReturn={this.handleReturn}
        sideButtons={this.sideButtons}
        rendererFn={this.rendererFn}
      />
    );
  }
}

export default ExtendedEdtior;
