import React from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw, KeyBindingUtil, Modifier } from "draft-js";
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
  ImageSideButton,
  SeparatorSideButton,
  EmbedSideButton,
  customRendererFn,
  HANDLED,
  NOT_HANDLED
} from "./index";

const newTypeMap = StringToTypeMap;
newTypeMap["2."] = Block.OL;

const { hasCommandModifier } = KeyBindingUtil;
const DQUOTE_START = "“";
const DQUOTE_END = "”";
const SQUOTE_START = "‘";
const SQUOTE_END = "’";

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

class ExtendedEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(),
      editorEnabled: true,
      placeholder: "Add notes here..."
    };

    this.sideButtons = [
      {
        title: "Image",
        component: ImageSideButton
      },
      {
        title: "Embed",
        component: EmbedSideButton,
        toggleModal: props.toggleModal,
        handleAddEmbeddedContent: props.handleAddEmbeddedContent
      },
      {
        title: "Separator",
        component: SeparatorSideButton
      }
    ];
    this.logData = this.logData.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.keyBinding = this.keyBinding.bind(this);
    this.handleDroppedFiles = this.handleDroppedFiles.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
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
        console.log("alt and shift held on text");
      }
      if (e.which === 72 /* Key H */) {
        console.log("i wrok!");
        return "toggleinline:HIGHLIGHT";
      }
    }
    return keyBindingFn(e);
  }

  logData() {
    const currentContent = this.state.editorState.getCurrentContent();
    const es = convertToRaw(currentContent);
    console.log(es);
    console.log(this.state.editorState.getSelection().toJS());
  }

  toggleEdit() {
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

  handleReturn() {
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
        sideButtons={this.sideButtons}
        rendererFn={customRendererFn}
        currentThread={this.props.currentThread}
        handleDocTitleChange={this.props.handleDocTitleChange}
        isToggled={this.props.isToggled}
      />
    );
  }
}

ExtendedEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.any,
  currentThread: PropTypes.any,
  handleDocTitleChange: PropTypes.any,
  toggleModal: PropTypes.func.isRequired,
  handleAddEmbeddedContent: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ExtendedEditor;
