import PropTypes from "prop-types";
import React from "react";
import AtomicEmbedComponent from "./atomic-embed.component";

const AtomicBlock = props => {
  const content = props.contentState;
  const entity = content.getEntity(props.block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();
  if (type === "image") {
    return (
      <div className="md-block-atomic-wrapper">
        <img alt="presentation" src={data.src} />
        <div className="md-block-atomic-controls">
          <button>&times;</button>
        </div>
      </div>
    );
  } else if (type === "embed") {
    console.log("ATOMIC.JS", data.url);
    return <AtomicEmbedComponent data={data.url} />;
  } else if (type === "separator") {
    return <hr />;
  }
  return <p>No supported block for {type}</p>;
};

AtomicBlock.propTypes = {
  block: PropTypes.object,
  getEditorState: PropTypes.func,
  editorState: PropTypes.any
};

export default AtomicBlock;
