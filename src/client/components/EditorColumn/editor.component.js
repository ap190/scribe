import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  editor: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "cyan"
  },
  button: {
    height: "100px",
    width: "50px"
  }
};

class Editor extends Component {
  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "2" };
  }
  render() {
    return (
      <div style={{ ...styles.editor, ...this.isEditorToggledStyles() }}>
        <button
          type="button"
          style={styles.button}
          onChange={this.props.toggleHandler}
        >
          Click Me!
        </button>
      </div>
    );
  }
}

Editor.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired
};

export default Editor;
