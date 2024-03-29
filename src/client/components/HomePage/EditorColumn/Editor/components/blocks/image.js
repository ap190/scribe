import PropTypes from "prop-types";
import React, { Component } from "react";

import { EditorBlock, EditorState, SelectionState } from "draft-js";

import { getCurrentBlock } from "../../model/";

class ImageBlock extends Component {
  constructor(props) {
    super(props);
    this.focusBlock = this.focusBlock.bind(this);
  }
  focusBlock() {
    const { block, blockProps } = this.props;
    const { getEditorState, setEditorState } = blockProps;
    const key = block.getKey();
    const editorState = getEditorState();
    const currentblock = getCurrentBlock(editorState);
    if (currentblock.getKey() === key) {
      return;
    }
    const newSelection = new SelectionState({
      anchorKey: key,
      focusKey: key,
      anchorOffset: 0,
      focusOffset: 0
    });
    setEditorState(EditorState.forceSelection(editorState, newSelection));
  }

  render() {
    const { block } = this.props;
    const data = block.getData();
    const src = data.get("src");
    if (src !== null) {
      return (
        <div>
          <div
            className="md-block-image-inner-container"
            onClick={this.focusBlock}
          >
            <img alt="presentation" src={src} />
          </div>
          <figcaption>
            <EditorBlock {...this.props} />
          </figcaption>
        </div>
      );
    }
    return <EditorBlock {...this.props} />;
  }
}

ImageBlock.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.object
};

export default ImageBlock;
