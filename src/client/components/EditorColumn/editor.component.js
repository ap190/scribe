import React, { Component } from "react";
import PropTypes from "prop-types";
import { Editor, createEditorState } from "medium-draft";
import "medium-draft/lib/index.css";
import "./editor.css";

const styles = {
  editor: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderLeft: "1px solid #979797",
    flex: "2"
  },
  button: {
    height: "100px",
    width: "50px"
  }
};

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
      <div style={styles.editor}>
        {isModalOpen ? null : (
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
          />
        )}
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
