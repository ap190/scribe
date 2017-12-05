import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import ExtendedEditor from "./Editor/extended-editor.component";
// import { Editor } from "medium-draft";
import "medium-draft/lib/index.css";
import "./editor.css";
import EditorActionBar from "./EditorActionBar";
import ColumnFooter from "../../common/ColumnFooter";

class EditorColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.currentDocument,
      currentThread: props.currentThread,
      editorEnabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.getEditorState = this.getEditorState.bind(this);
  }

  componentDidMount() {
    // this.refs.editor.focus();
  }

  onChange(editorState, callback) {
    if (this.state.editorEnabled) {
      this.props.handleDocumentChange(
        editorState,
        convertToRaw(editorState.getCurrentContent())
      );
      if (callback) {
        callback();
      }
    }
  }

  getEditorState() {
    return this.state.editorState;
  }

  render() {
    const {
      isModalOpen,
      toggleHandler,
      isEditorToggled,
      saveWorkspace,
      currentThread,
      currentDocument
    } = this.props;
    return (
      <div className="editor">
        <EditorActionBar
          handleSave={saveWorkspace}
          handleMaximize={toggleHandler}
          handleNextThread={() => console.log("next thread...")}
          isEditorToggled={isEditorToggled}
        />
        <ExtendedEditor
          ref="editor"
          style={{ justifySelf: "flex-start" }}
          editorState={currentDocument}
          onChange={this.onChange}
          currentThread={currentThread}
          handleDocTitleChange={this.props.handleThreadTitleChange}
        />
        {!isModalOpen && <ColumnFooter />}
      </div>
    );
  }
}

EditorColumn.defaultProps = {
  currentDocument: EditorState.createEmpty(),
  currentTitle: "Untitled"
};

EditorColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  saveWorkspace: PropTypes.func.isRequired,
  handleDocumentChange: PropTypes.func.isRequired,
  handleThreadTitleChange: PropTypes.func.isRequired,
  currentDocument: PropTypes.any,
  currentThread: PropTypes.any
};

export default EditorColumn;
