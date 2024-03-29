import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, AtomicBlockUtils } from "draft-js";
import lightTheme from "../../../../../../themes/light-theme";
import darkTheme from "../../../../../../themes/dark-theme";

const getStyle = isDark => {
  return {
    background: isDark
      ? darkTheme.floatingButton.background
      : lightTheme.floatingButton.background,
    border: isDark
      ? darkTheme.floatingButton.border
      : lightTheme.floatingButton.border
  };
};

class SeparatorSideButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let editorState = this.props.getEditorState();
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      "separator",
      "IMMUTABLE",
      {}
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    editorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, "-")
    );
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a separator"
        onClick={this.onClick}
        style={getStyle(this.props.isDarkTheme)}
      >
        <img
          src={
            this.props.isDarkTheme
              ? darkTheme.icons.seperator
              : lightTheme.icons.seperator
          }
          alt="Embed img"
          height="15"
          width="15"
        />
      </button>
    );
  }
}

SeparatorSideButton.propTypes = {
  setEditorState: PropTypes.func,
  close: PropTypes.func,
  getEditorState: PropTypes.func,
  isDarkTheme: PropTypes.bool.isRequired
};

export default SeparatorSideButton;
