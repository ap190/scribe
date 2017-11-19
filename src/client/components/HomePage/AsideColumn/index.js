import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Channels from "./Channels";
import Tree from "./Tree";
import "./aside.css";
import ColumnFooter from "../../common/ColumnFooter";

const styles = {
  height: "100%",
  backgroundColor: "#f2f2f2",
  display: "flex",
  flexDirection: "column"
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
    const { isModalOpen } = this.props;
    return (
      <div style={{ ...styles, ...this.isEditorToggledStyles() }}>
        <Channels
          title={"Channels"}
          toggleModal={this.props.toggleModal}
          channels={this.props.channels}
          selectChannelOrFile={this.props.selectChannelOrFile}
        />
        <Tree
          title={"Projects"}
          tree={this.props.tree}
          handleOpenDir={this.props.selectProjectDir}
          selectFile={this.props.selectFile}
          activeNode={this.props.activeNode}
        />
        {!isModalOpen && <ColumnFooter />}
      </div>
    );
  }
}

Aside.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
  selectProjectDir: PropTypes.func.isRequired,
  tree: PropTypes.any.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  activeNode: PropTypes.any,
  isModalOpen: PropTypes.bool
};

export default Aside;
