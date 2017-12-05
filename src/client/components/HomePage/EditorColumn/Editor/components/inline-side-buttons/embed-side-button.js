import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, AtomicBlockUtils } from "draft-js";
import { modals } from "../../../../../../utils/const";

class EmbedSideButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addEmbedURL = this.addEmbedURL.bind(this);
  }

  onClick() {
    this.props.toggleModal(modals.EMBED_CONTENT_MODAL);
    this.props.close();
    if (!this.props.lastEmbeddedURL) return;
    this.addEmbedURL(this.props.lastEmbeddedURL);
  }

  addEmbedURL(url) {
    if (!url) return;
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
  toggleModal: PropTypes.func.isRequired,
  close: PropTypes.func,
  editorState: PropTypes.any
};

export default EmbedSideButton;