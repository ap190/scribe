import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import "medium-draft/lib/index.css";
import ExtendedEditor from "./Editor/extended-editor.component";
import "./editor.css";
import EditorActionBar from "./EditorActionBar";
import ColumnFooter from "../../common/ColumnFooter";
import DefaultDoc from "./DefaultDoc/default-doc.component";
import darkTheme from "../../../themes/dark-theme";
import lightTheme from "../../../themes/light-theme";

const getStyle = isDark => {
  return {
    color: isDark ? darkTheme.helpButton.color : lightTheme.helpButton.color,
    border: isDark ? darkTheme.helpButton.border : lightTheme.helpButton.border
  };
};

class EditorColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.currentDocument,
      currentThread: props.currentThread,
      editorEnabled: true,
      showDefaultDoc: props.currentThread === undefined
    };

    this.onChange = this.onChange.bind(this);
    this.getEditorState = this.getEditorState.bind(this);
    this.showDefaultDoc = this.showDefaultDoc.bind(this);
  }

  onChange(editorState) {
    if (this.state.editorEnabled) {
      this.props.updateDocumentState(editorState);
    }
  }

  getEditorState() {
    return this.state.editorState;
  }

  showDefaultDoc() {
    this.setState({ showDefaultDoc: true });
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
      exportCurrentDocAsHTML,
      wasDocumentEdited,
      isDarkTheme
    } = this.props;
    return (
      <div
        className="editor"
        style={{ backgroundColor: isDarkTheme ? "#212225" : "#fff" }}
      >
        <EditorActionBar
          shouldShowNext={currentThreads && currentThreads.length > 1}
          handleSave={saveWorkspace}
          handleExportToHTML={exportCurrentDocAsHTML}
          handleMaximize={toggleEditorHandler}
          handleNextThread={nextThreadHandler}
          isEditorToggled={isEditorToggled}
          wasDocumentEdited={wasDocumentEdited}
          isDarkTheme={isDarkTheme}
        />
        {currentThread && !this.state.showDefaultDoc ? (
          <ExtendedEditor
            ref="editor"
            style={{ justifySelf: "flex-start" }}
            editorState={currentDocument}
            onChange={this.onChange}
            toggleModal={this.props.toggleModal}
            currentThread={currentThread}
            wasDocumentEdited={wasDocumentEdited}
            handleDocTitleChange={this.props.handleThreadTitleChange}
            handleAddEmbeddedContent={this.props.handleAddEmbeddedContent}
            isToggled={isEditorToggled}
            isDarkTheme={isDarkTheme}
          />
        ) : (
          <DefaultDoc />
        )}
        <ColumnFooter darkTheme={this.props.isDarkTheme}>
          {!isModalOpen ? (
            <div
              className="help-button-container"
              onClick={this.showDefaultDoc}
            >
              <div
                className="help-button"
                style={getStyle(this.props.isDarkTheme)}
              >
                {" "}
                ?{" "}
              </div>
            </div>
          ) : null}
        </ColumnFooter>
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
  exportCurrentDocAsHTML: PropTypes.func.isRequired,
  wasDocumentEdited: PropTypes.bool,
  isDarkTheme: PropTypes.bool.isRequired
};

export default EditorColumn;
