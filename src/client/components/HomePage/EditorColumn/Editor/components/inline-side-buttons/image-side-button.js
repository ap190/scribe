import PropTypes from "prop-types";
import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
import lightTheme from "../../../../../../themes/light-theme";
import darkTheme from "../../../../../../themes/dark-theme";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

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

class ImageButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      const imgID = UUIDv4(10);
      ipcRenderer.send("save-img", imgID, file.path);
      // const src = `file:///${file.path}`;
      // this.props.setEditorState(
      //   addNewBlock(this.props.getEditorState(), Block.IMAGE, {
      //     src
      //   })
      // );
    }
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        onClick={this.onClick}
        title="Add an Image"
        style={getStyle(this.props.isDarkTheme)}
      >
        <img
          src={
            this.props.isDarkTheme
              ? darkTheme.icons.imageEmbed
              : lightTheme.icons.imageEmbed
          }
          alt="Embed img"
          height="15"
          width="15"
        />
        <input
          type="file"
          accept="image/*"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </button>
    );
  }
}

ImageButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
  isDarkTheme: PropTypes.bool.isRequired
};

export default ImageButton;
