import cx from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import mime from "mime-types";
import lightTheme from "../../../../themes/light-theme";

class UITreeNode extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse(e) {
    e.stopPropagation();
    const nodeId = this.props.index.id;

    if (this.props.onCollapse) {
      this.props.onCollapse(nodeId);
    }
  }

  renderIcon() {
    const { index } = this.props;
    if (!index || !index.node || !index.node.module) {
      return null;
    }
    let caretIcon;
    if (index.children) {
      caretIcon = lightTheme.icons.folder;
    } else {
      const mimeType = mime.lookup(index.node.module);
      caretIcon =
        mimeType && mimeType.split("/")[0] === "image"
          ? lightTheme.icons.imageFile
          : lightTheme.icons.textFile;
    }
    return <img className="node-icon" src={caretIcon} alt="Caret Icon" />;
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
                onCollapse={this.props.onCollapse}
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
          {this.renderIcon()}
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
  index: PropTypes.object
};

module.exports = UITreeNode;
