import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, AtomicBlockUtils } from "draft-js";

class EmbedSideButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addEmbedURL = this.addEmbedURL.bind(this);
  }

  onClick() {
    // const url = window.prompt(
    //   "Enter a URL",
    //   "https://www.youtube.com/watch?v=PMNFaAUs2mo"
    // );
    this.props.close();
    // if (!url) {
    //   return;
    // }
    this.addEmbedURL(
      "https://www.youtube.com/watch?v=VEpMj-tqixs&list=RD6u0DGIh3wLA&index=11"
    );
  }

  addEmbedURL(url) {
    // let editorState = this.props.getEditorState();
    const content = this.props.editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("embed", "IMMUTABLE", {
      url
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.push(
      this.props.editorState,
      contentWithEntity,
      "create-entity"
    );
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, "E")
    );
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add an Embed"
        onClick={this.onClick}
      >
        <i className="fa fa-code" />
      </button>
    );
  }
}

EmbedSideButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
  editorState: PropTypes.any
};

export default EmbedSideButton;
