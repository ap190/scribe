import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import "medium-draft/lib/index.css";
import ExtendedEditor from "./Editor/extended-editor.component";
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

  onChange(editorState) {
    if (this.state.editorEnabled) {
      this.props.updateDocumentState(editorState);
    }
  }

  getEditorState() {
    return this.state.editorState;
  }

  isEditorToggledStyle() {
    return this.props.isEditorToggled ? null : { maxWidth: "48%" };
  }

  render() {
    const {
      isModalOpen,
      toggleEditorHandler,
      nextThreadHandler,
      isEditorToggled,
      saveWorkspace,
      currentThreads,
      currentThread,
      currentDocument,
      exportCurrentDocAsHTML
    } = this.props;
    return (
      <div className="editor">
        <EditorActionBar
          shouldShowNext={currentThreads.length > 1}
          handleSave={saveWorkspace}
          handleExportToHTML={exportCurrentDocAsHTML}
          handleMaximize={toggleEditorHandler}
          handleNextThread={nextThreadHandler}
          isEditorToggled={isEditorToggled}
        />
        <ExtendedEditor
          ref="editor"
          style={{ justifySelf: "flex-start" }}
          editorState={currentDocument}
          onChange={this.onChange}
          toggleModal={this.props.toggleModal}
          currentThread={currentThread}
          handleDocTitleChange={this.props.handleThreadTitleChange}
          handleAddEmbeddedContent={this.props.handleAddEmbeddedContent}
        />
        {!isModalOpen && <ColumnFooter />}
      </div>
    );
  }
}

EditorColumn.defaultProps = {
  currentDocument: EditorState.createEmpty()
};

EditorColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleEditorHandler: PropTypes.func.isRequired,
  nextThreadHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  saveWorkspace: PropTypes.func.isRequired,
  updateDocumentState: PropTypes.func.isRequired,
  currentDocument: PropTypes.any,
  handleThreadTitleChange: PropTypes.func.isRequired,
  currentThreads: PropTypes.any,
  currentThread: PropTypes.any,
  handleAddEmbeddedContent: PropTypes.func.isRequired,
  exportCurrentDocAsHTML: PropTypes.func.isRequired
};

export default EditorColumn;
