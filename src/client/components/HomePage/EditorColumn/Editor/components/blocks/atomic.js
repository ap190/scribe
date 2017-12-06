import PropTypes from "prop-types";
import React from "react";
import AtomicEmbedComponent from "./atomic-embed.component";
import AtomicSeparatorComponent from "./atomic-seperator.component";
/*
This strategy is straight out of the official docs
https://draftjs.org/docs/advanced-topics-block-components.html#content
*/

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
    return <AtomicEmbedComponent data={data.url} />;
  } else if (type === "separator") {
    return <AtomicSeparatorComponent />;
  }
  return <p>No supported block for {type}</p>;
};

AtomicBlock.propTypes = {
  block: PropTypes.object,
  contentState: PropTypes.any
};

export default AtomicBlock;
