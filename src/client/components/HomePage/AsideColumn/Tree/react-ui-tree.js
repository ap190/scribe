import React, { Component } from "react";
import PropTypes from "prop-types";
import Tree from "./tree";
import Node from "./node";

export default class UITree extends Component {
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

  render() {
    const tree = new Tree(this.props.tree);
    tree.isNodeCollapsed = this.props.isNodeCollapsed;
    tree.renderCollapse = this.props.renderCollapse;
    tree.renderIcon = this.props.renderIcon;
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
          toggleCollapse={this.props.toggleCollapse}
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
  renderNode: PropTypes.func.isRequired,
  renderCollapse: PropTypes.func.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  renderIcon: PropTypes.func.isRequired
};
