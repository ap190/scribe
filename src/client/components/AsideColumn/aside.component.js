import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Modal from "../Modal/modal.component";
import Channels from "./Channels/channels.component";
import Tree from "./Tree/tree.component";
import "./aside.css";

const addFlowIcon = "./assets/icons/simple_add.png";

const styles = {
  height: "100%",
  backgroundColor: "#f2f2f2"
};

class Aside extends Component {
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
        <Channels
          title={"Channels"}
          createChannelHandler={this.props.createChannelHandler}
        />
        <Tree
          paddingLeft={20}
          tree={this.props.tree}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode}
        />
        <button onClick={this.props.selectProjectDir}>open project</button>
      </div>
    );
  }
}

Aside.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  selectProjectDir: PropTypes.func.isRequired,
  tree: PropTypes.any.isRequired,
  createChannelHandler: PropTypes.func.isRequired
};

export default Aside;
