import React, { Component } from "react";
import cx from "classnames";
import FileTree from "react-ui-tree";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import { HIGHLIGHT_THREAD_MODAL } from "../../../utils/const";

const folderIcon = "./assets/icons/folder.png";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.renderNode = this.renderNode.bind(this);
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTree = this.updateTree.bind(this);
  }

  onClickNode(node) {
    this.setState({
      active: node
    });
  }

  handleChange(tree) {
    this.setState({
      tree
    });
  }

  updateTree() {
    const { tree } = this.state;
    tree.children.push({ module: "test" });
    this.setState({
      tree
    });
  }

  renderNode(node) {
    return (
      <span
        role="menuitem"
        tabIndex="0"
        className={cx("node", {
          "is-active": node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
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
          modalType={HIGHLIGHT_THREAD_MODAL}
        />
        <div className="tree">
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
  title: PropTypes.string.isRequired
};

export default Tree;
