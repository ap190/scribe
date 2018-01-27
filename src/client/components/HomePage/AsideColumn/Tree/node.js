import cx from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getTheme = isDark => {
  return {
    color: isDark
      ? darkTheme.aside.fileTree.header.color
      : lightTheme.aside.fileTree.header.color,
    container: {
      backgroundColor: isDark
        ? darkTheme.aside.fileTree.container.backgroundColor
        : lightTheme.aside.fileTree.container.backgroundColor
    },
    node: {
      color: isDark
        ? darkTheme.aside.fileTree.node
        : lightTheme.aside.fileTree.node,
      caret: isDark
        ? darkTheme.aside.fileTree.node.caret
        : lightTheme.aside.fileTree.node.caret
    },
    folder: {
      icon: isDark
        ? darkTheme.aside.fileTree.folder.icon
        : lightTheme.aside.fileTree.folder.icon
    }
  };
};

class UITreeNode extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
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
          style={{ color: getTheme(this.props.darkTheme).node.caret }}
        />
      );
    }

    return null;
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
    const { tree, index, activeNode } = this.props;
    const { node } = index;

    if (activeNode) {
      console.log(activeNode);
    }

    return (
      <div className={cx("m-node")}>
        <div className="inner" ref="inner" onMouseDown={this.handleMouseDown}>
          {this.renderCollapse()}
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
  darkTheme: PropTypes.bool,
  activeNode: PropTypes.any
};

module.exports = UITreeNode;
