import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor, createEditorState } from "medium-draft";
import "medium-draft/lib/index.css";
import "./editor.css";
import EditorActionBar from "./EditorActionBar";
import ColumnFooter from "../../common/ColumnFooter";

class EditorColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState() // for empty content
    };

    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

    this.onChange = editorState => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "2" };
  }
  render() {
    const { editorState } = this.state;
    const { isModalOpen, toggleHandler } = this.props;
    return (
      <div className="editor">
        <EditorActionBar
          handleSave={() => console.log("maximizing...")}
          handleMaximize={toggleHandler}
          handleNextThread={() => console.log("next thread...")}
        />
        <Editor
          className="check"
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          style={{ justifySelf: "flex-start" }}
        />
        {!isModalOpen && <ColumnFooter />}
      </div>
    );
  }
}

EditorColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired
};

export default EditorColumn;
