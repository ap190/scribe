import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import FileTree from "./react-ui-tree";

const folderIcon = "./assets/icons/folder.png";

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
        />
        <div className="file-tree-container">
          <FileTree
            tree={this.props.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
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
  selectFile: PropTypes.func.isRequired
};

export default Tree;
