import React, { Component } from "react";
import PropTypes from "prop-types";
import lightTheme from "../../../../../../themes/light-theme";
import darkTheme from "../../../../../../themes/dark-theme";
import { addNewBlock } from "../../model";
import { Block } from "../../util/constants";

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

class CodeBlockSideButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setEditorState(
      addNewBlock(this.props.getEditorState(), Block.CODE)
    );
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a code block"
        onClick={this.onClick}
        style={getStyle(this.props.isDarkTheme)}
      >
        <img
          src={
            this.props.isDarkTheme
              ? darkTheme.icons.codeBlock
              : lightTheme.icons.codeBlock
          }
          alt="Embed img"
          height="15"
          width="15"
        />
      </button>
    );
  }
}

CodeBlockSideButton.propTypes = {
  setEditorState: PropTypes.func,
  close: PropTypes.func,
  getEditorState: PropTypes.func,
  isDarkTheme: PropTypes.bool.isRequired
};

export default CodeBlockSideButton;
