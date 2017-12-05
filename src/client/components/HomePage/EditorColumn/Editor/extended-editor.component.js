import React from "react";
import PropTypes from "prop-types";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier
} from "draft-js";
import "draft-js/dist/Draft.css";

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
  MediumDraftEditor,
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
  customRendererFn,
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

class ExtendedEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(),
      editorEnabled: true,
      placeholder: "Add notes here..."
    };

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
    this.rendererFn = this.rendererFn.bind(this);
    this.getSideButtons = this.getSideButtons.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState, callback = null) {
    if (this.state.editorEnabled) {
      this.setState({ editorState }, () => {
        if (callback) {
          callback();
        }
      });
    }
  }

  getSideButtons() {
    return [
      {
        title: "Image",
        component: ImageSideButton
      },
      {
        title: "Embed",
        component: EmbedSideButton,
        toggleModal: this.props.toggleModal,
        handleAddEmbeddedContent: this.props.handleAddEmbeddedContent,
        lastEmbeddedURL: this.props.lastEmbeddedURL
      },
      {
        title: "Separator",
        component: SeparatorSideButton
      }
    ];
  }

  rendererFn(setEditorState, getEditorState) {
    const atomicRenderers = {
      embed: AtomicEmbedComponent,
      separator: AtomicSeparatorComponent
    };
    const rFnOld = customRendererFn(setEditorState, getEditorState);
    const editorState = this.state.editorState;
    const rFnNew = contentBlock => {
      const type = contentBlock.getType();
      switch (type) {
        case Block.ATOMIC:
          return {
            component: AtomicBlock,
            editable: false,
            props: {
              components: atomicRenderers,
              getEditorState,
              editorState: editorState.getCurrentContent()
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
        if (e.which === 76) {
          /* Alt + Shift + L */
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
    const newWin = window.open(
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
      const src = URL.createObjectURL(file);
      console.log("src is", src);
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
    const { editorEnabled } = this.state;
    return (
      <MediumDraftEditor
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        editorEnabled={editorEnabled}
        handleDroppedFiles={this.handleDroppedFiles}
        handleKeyCommand={this.handleKeyCommand}
        placeholder={this.state.placeholder}
        keyBindingFn={this.keyBinding}
        beforeInput={handleBeforeInput}
        handleReturn={this.handleReturn}
        sideButtons={this.getSideButtons()}
        rendererFn={this.rendererFn}
        currentThread={this.props.currentThread}
        handleDocTitleChange={this.props.handleDocTitleChange}
      />
    );
  }
}

ExtendedEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.any,
  currentThread: PropTypes.any,
  handleDocTitleChange: PropTypes.any,
  lastEmbeddedURL: PropTypes.string
};

export default ExtendedEditor;
