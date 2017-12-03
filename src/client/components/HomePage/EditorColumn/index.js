import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "medium-draft";
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

  onChange(editorState) {
    this.props.handleDocumentChange(
      editorState,
      convertToRaw(editorState.getCurrentContent())
    );
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
      currentDocument,
      currentThread
    } = this.props;
    return (
      <div className="editor">
        <EditorActionBar
          handleSave={saveWorkspace}
          handleMaximize={toggleHandler}
          handleNextThread={() => console.log("next thread...")}
          isEditorToggled={isEditorToggled}
        />
        <input
          className="doc-title"
          type="text"
          value={currentThread === undefined ? "Untitled" : currentThread.title}
          onChange={event =>
            this.props.handleThreadTitleChange(event.target.value)}
        />
        <div className="update-time">
          {currentThread === undefined || currentThread.date === "Unsaved"
            ? "New thread has not been saved yet."
            : `Last Saved: ${currentThread.date}`}
        </div>
        <Editor
          ref="editor"
          editorState={currentDocument}
          onChange={this.onChange}
          style={{ justifySelf: "flex-start" }}
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
