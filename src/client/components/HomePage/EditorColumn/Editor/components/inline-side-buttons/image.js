import PropTypes from "prop-types";
import React, { Component } from "react";

import { addNewBlock } from "../../model";
import { Block } from "../../util/constants";

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

  /*
  This is an example of how an image button can be added
  on the side control. This Button handles the image addition locally
  by creating an object url. You can override this method to upload
  images to your server first, then get the image url in return and then
  add to the editor.
  */
  onChange(e) {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      // console.log(this.props.getEditorState());
      // eslint-disable-next-line no-undef
      // const src = URL.createObjectURL(file);
      const src =
        "file:///Users/omergoldberg/Library/Application%20Support/MindFlow.ai/mfimg/kiosp9xqqr.png";
      console.log("src is ", src);
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src
        })
      );
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
      >
        <i className="fa fa-image" />
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
  close: PropTypes.func
};

export default ImageButton;
