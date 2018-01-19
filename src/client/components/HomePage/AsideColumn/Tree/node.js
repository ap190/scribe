import cx from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";

class UITreeNode extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren() {
    const { index, tree } = this.props;

    if (index.children && index.children.length) {
      const childrenStyles = {
        paddingLeft: this.props.paddingLeft
      };

      return (
        <div className="children" style={childrenStyles}>
          {index.children.map(child => {
            const childIndex = tree.getIndex(child);

            return (
              <UITreeNode
                tree={tree}
                index={childIndex}
                key={childIndex.id}
                paddingLeft={this.props.paddingLeft}
                onCollapse={this.props.toggleCollapse}
              />
            );
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const { tree, index } = this.props;
    const { node } = index;
    return (
      <div className={cx("m-node")}>
        <div className="inner" ref="inner" onMouseDown={this.handleMouseDown}>
          {tree.renderCollapse(index)}
          {tree.renderIcon(index)}
          {tree.renderNode(node)}
        </div>
        {node.collapsed ? null : this.renderChildren()}
      </div>
    );
  }
}

UITreeNode.propTypes = {
  tree: PropTypes.object.isRequired,
  paddingLeft: PropTypes.number,
  index: PropTypes.object,
  toggleCollapse: PropTypes.func.isRequired
};

module.exports = UITreeNode;
