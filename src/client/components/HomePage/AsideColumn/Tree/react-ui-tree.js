import React, { Component } from "react";
import PropTypes from "prop-types";
import Tree from "./tree";
import Node from "./node";

class UITree extends Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this._updated) {
      this.setState(this.init(nextProps));
    } else {
      this._updated = false;
    }
  }

  init() {
    const tree = new Tree(this.props.tree);
    tree.isNodeCollapsed = this.props.isNodeCollapsed;
    tree.renderNode = this.props.renderNode;
    tree.changeNodeCollapsed = this.props.changeNodeCollapsed;
    tree.updateNodesPosition();

    return { tree };
  }

  change(tree) {
    this._updated = true;
    if (this.props.onChange) this.props.onChange(tree.obj);
  }

  toggleCollapse(nodeId) {
    const tree = this.state.tree;
    const index = tree.getIndex(nodeId);
    const node = index.node;
    node.collapsed = !node.collapsed;
    tree.updateNodesPosition();

    this.setState({
      tree
    });

    this.change(tree);
  }

  render() {
    const tree = new Tree(this.props.tree);
    tree.isNodeCollapsed = this.props.isNodeCollapsed;
    tree.renderNode = this.props.renderNode;
    tree.changeNodeCollapsed = this.props.changeNodeCollapsed;
    tree.updateNodesPosition();
    this.state = { tree };

    return (
      <div className="m-tree">
        <Node
          tree={tree}
          index={tree.getIndex(1)}
          key={1}
          paddingLeft={this.props.paddingLeft}
          onCollapse={this.toggleCollapse}
        />
      </div>
    );
  }
}

UITree.defaultProps = {
  paddingLeft: 20
};

UITree.propTypes = {
  tree: PropTypes.object.isRequired,
  paddingLeft: PropTypes.number,
  renderNode: PropTypes.func.isRequired
};

module.exports = UITree;
