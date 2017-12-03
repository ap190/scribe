import React from "react";
import PropTypes from "prop-types";

const AtomicBlock = props => {
  const { blockProps, block } = props;
  const content = blockProps.getEditorState().getCurrentContent();
  const entity = content.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();
  if (blockProps.components[type]) {
    const AtComponent = blockProps.components[type];
    return (
      <div
        className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}
      >
        <AtComponent data={data} />
      </div>
    );
  }
  return (
    <p>
      Block of type <b>{type}</b> is not supported.
    </p>
  );
};

AtomicBlock.propTypes = {
  blockProps: PropTypes.any,
  block: PropTypes.any
};

export default AtomicBlock;
