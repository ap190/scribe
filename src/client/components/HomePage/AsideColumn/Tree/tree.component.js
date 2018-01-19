import React, { Component } from "react";
import cx from "classnames";
import mime from "mime-types";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import FileTree from "./react-ui-tree";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const folderIcon = "./assets/icons/folder.png";

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

class Tree extends Component {
  constructor(props) {
    super(props);
    this.renderNode = this.renderNode.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClickNode(file) {
    this.props.selectFile(file);
  }

  handleChange(tree) {
    this.setState({
      tree
    });
  }

  renderCollapse(index) {
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

  renderIcon(index) {
    if (!index || !index.node || !index.node.module) {
      return null;
    }

    const theme = this.props.darkTheme ? darkTheme : lightTheme;
    let caretIcon;
    if (index.children) {
      caretIcon = theme.icons.folder;
    } else {
      const mimeType = mime.lookup(index.node.module);
      caretIcon =
        mimeType && mimeType.split("/")[0] === "image"
          ? theme.icons.imageFile
          : theme.icons.textFile;
    }
    return <img className="node-icon" src={caretIcon} alt="Caret Icon" />;
  }

  renderNode(node) {
    const numThreads = this.props.getNumberOfThreads(node);
    const numThreadsString = numThreads === 0 ? "" : numThreads;
    return (
      <div
        className={cx("node", {
          "is-active": node === this.props.activeNode
        })}
        role="menuitem"
        onClick={this.onClickNode.bind(null, node)}
        style={getTheme(this.props.darkTheme).node.color}
      >
        <span tabIndex="0">{node.module}</span>
        {numThreads !== 0 ? (
          <div className="thread-num-circle"> {numThreadsString}</div>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div className="projects-container">
        <Header
          title={this.props.title}
          handler={this.props.handleOpenDir}
          alternativeText="Select a Project"
          source={folderIcon}
          darkTheme={this.props.darkTheme}
        />
        <div
          className="file-tree-container"
          style={getTheme(this.props.darkTheme).container}
        >
          <FileTree
            tree={this.props.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderCollapse={this.renderCollapse.bind(this)}
            renderIcon={this.renderIcon.bind(this)}
            renderNode={this.renderNode}
            darkTheme={this.props.darkTheme}
          />
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  tree: PropTypes.any.isRequired,
  handleOpenDir: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  activeNode: PropTypes.any,
  getNumberOfThreads: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

export default Tree;
