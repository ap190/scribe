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

  componentDidMount() {
    // this.refs.editor.focus();
  }

  onChange(editorState) {
    if (this.state.editorEnabled) {
      this.props.handleDocumentChange(editorState);
    }
  }

  getEditorState() {
    return this.state.editorState;
  }

  render() {
    const {
      isModalOpen,
      toggleEditorHandler,
      isEditorToggled,
      saveWorkspace,
      currentDocument,
      exportCurrentDocAsHTML
    } = this.props;
    return (
      <div className="editor">
        <EditorActionBar
          handleSave={saveWorkspace}
          handleExportToHTML={exportCurrentDocAsHTML}
          handleMaximize={toggleEditorHandler}
          handleNextThread={() => console.log("next thread...")}
          isEditorToggled={isEditorToggled}
        />
        <ExtendedEditor
          ref="editor"
          style={{ justifySelf: "flex-start" }}
          editorState={currentDocument}
          onChange={this.onChange}
          toggleModal={this.props.toggleModal}
          handleAddEmbeddedContent={this.props.handleAddEmbeddedContent}
        />
        {!isModalOpen && <ColumnFooter />}
      </div>
    );
  }
}

EditorColumn.defaultProps = {
  currentDocument: EditorState.createEmpty(),
  currentTitle: "Untitledd"
};

EditorColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleEditorHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  saveWorkspace: PropTypes.func.isRequired,
  handleDocumentChange: PropTypes.func.isRequired,
  currentDocument: PropTypes.any,
  currentThread: PropTypes.any,
  handleAddEmbeddedContent: PropTypes.func.isRequired,
  exportCurrentDocAsHTML: PropTypes.func.isRequired
};

export default EditorColumn;
