import cx from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import mime from "mime-types";
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
    // this.renderIcon = this.renderIcon.bind(this);
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

  // renderIcon() {
  //   const { index } = this.props;
  //   if (!index || !index.node || !index.node.module) {
  //     return null;
  //   }

  //   const theme = this.props.darkTheme ? darkTheme : lightTheme;
  //   console.log(theme === darkTheme ? "dark" : "light");
  //   let caretIcon;
  //   if (index.children) {
  //     caretIcon = theme.icons.folder;
  //   } else {
  //     const mimeType = mime.lookup(index.node.module);
  //     caretIcon =
  //       mimeType && mimeType.split("/")[0] === "image"
  //         ? theme.icons.imageFile
  //         : theme.icons.textFile;
  //   }
  //   return <img className="node-icon" src={caretIcon} alt="Caret Icon" />;
  // }

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
  darkTheme: PropTypes.bool.isRequired
};

module.exports = UITreeNode;
