import cx from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import mime from "mime-types";

const folderIcon = "./assets/icons/folder.png";
const imageFileIcon = "./assets/icons/image_file.png";
const textFileIcon = "./assets/icons/text_file.png";

class UITreeNode extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse(e) {
    e.stopPropagation();
    const nodeId = this.props.index.id;

    if (this.props.onCollapse) {
      this.props.onCollapse(nodeId);
    }
  }

  renderCollapse() {
    const { index } = this.props;

    if (index.children && index.children.length) {
      const { collapsed } = index.node;

      return (
        <span
          className={cx("collapse", collapsed ? "caret-right" : "caret-down")}
          onMouseDown={e => e.stopPropagation()}
          onClick={this.handleCollapse}
        />
      );
    }

    return null;
  }

  renderIcon() {
    const { index } = this.props;
    if (!index || !index.node || !index.node.module) {
      return null;
    }
    let caretIcon;
    const fileExtension = index.node.module.split(".").pop();
    if (index.children) {
      caretIcon = folderIcon;
    } else {
      const mimeType = mime.lookup(index.node.module);
      caretIcon =
        mimeType && mimeType.split("/")[0] === "image"
          ? imageFileIcon
          : textFileIcon;
    }
    return <img className="node-icon" src={caretIcon} />;
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
          {this.renderCollapse()}
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
