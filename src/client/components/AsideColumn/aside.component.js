import React, { Component } from "react";
import FileTree from "react-ui-tree";
import PropTypes from "prop-types";
import cx from "classnames";
import treeFromFile from "./tree";
import "./aside.css";

const styles = {
  height: "100%",
  backgroundColor: "#21252b"
};

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      tree: treeFromFile
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

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : null;
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
      <div style={{ ...styles, ...this.isEditorToggledStyles() }}>
        <div className="tree">
          <FileTree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector" />
      </div>
    );
  }
}

Aside.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired
};

export default Aside;
