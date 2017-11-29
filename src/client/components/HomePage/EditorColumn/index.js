import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
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
      currentTitle: props.currentTitle,
      editorEnabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.getEditorState = this.getEditorState.bind(this);
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  onChange(editorState) {
    console.log("in editor", convertToRaw(editorState.getCurrentContent()));
    this.props.handleDocumentChange(
      editorState,
      convertToRaw(editorState.getCurrentContent())
    );
  }

  getEditorState() {
    return this.state.editorState;
  }

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "2" };
  }
  render() {
    const {
      isModalOpen,
      toggleHandler,
      isEditorToggled,
      saveWorkspace,
      currentDocument,
      currentTitle
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
          value={currentTitle}
          onChange={event =>
            this.props.handleThreadTitleChange(event.target.value)
          }
        />
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
  currentTitle: PropTypes.string.isRequired
};

export default EditorColumn;
