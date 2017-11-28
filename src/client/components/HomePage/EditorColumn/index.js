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
      editorEnabled: true,
      placeholder: "Write here..."
    };

    this.onChange = this.onChange.bind(this);
    this.getEditorState = this.getEditorState.bind(this);
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  onChange(editorState) {
    this.props.handleDocumentChange(editorState);
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
  currentDocument: EditorState.createEmpty()
};

EditorColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  saveWorkspace: PropTypes.func.isRequired,
  handleDocumentChange: PropTypes.func.isRequired,
  currentDocument: PropTypes.any
};

export default EditorColumn;
