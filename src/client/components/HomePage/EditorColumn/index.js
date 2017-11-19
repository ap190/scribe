import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor, createEditorState } from "medium-draft";
import "medium-draft/lib/index.css";
import "./editor.css";
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
    const { isModalOpen } = this.props;
    return (
      <div className="editor">
        {isModalOpen ? null : (
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
          />
        )}

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