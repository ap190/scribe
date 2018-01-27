import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Channels from "./Channels";
import UserWidget from "../../common/UserWidget";
import Tree from "./Tree";
import Icon from "../../common/Icon";
import { Images } from "../../../themes";
import "./aside.css";
import ColumnFooter from "../../common/ColumnFooter";
import lightTheme from "../../../themes/light-theme";
import darkTheme from "../../../themes/dark-theme";

const getTheme = isDark => {
  return {
    height: "100%",
    backgroundColor: isDark
      ? darkTheme.aside.backgroundColor
      : lightTheme.aside.backgroundColor,
    display: "flex",
    flexDirection: "column"
  };
};

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.onClickNode = this.onClickNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.lastName = this.launchEditor.bind(this);
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

  launchEditor() {
    console.log("hey, im jeff");
  }

  render() {
    const {
      channels,
      toggleModal,
      tree,
      selectProjectDir,
      getNumberOfThreads,
      selectFile,
      activeNode,
      selectChannelOrFile,
      handleDeleteChannel,
      firstName,
      lastName,
      email,
      launchEditor,
      isDarkTheme
    } = this.props;
    return (
      <div style={getTheme(isDarkTheme)}>
        <UserWidget
          firstName={firstName}
          darkTheme={isDarkTheme}
          lastName={lastName}
          email={email}
        />
        <Channels
          title={"Notebooks"}
          toggleModal={toggleModal}
          channels={channels}
          selectChannelOrFile={selectChannelOrFile}
          handleDeleteChannel={handleDeleteChannel}
          darkTheme={isDarkTheme}
        />
        <Tree
          title={"Project"}
          tree={tree}
          handleOpenDir={selectProjectDir}
          getNumberOfThreads={getNumberOfThreads}
          selectFile={selectFile}
          activeNode={activeNode}
          darkTheme={isDarkTheme}
        />
        <ColumnFooter darkTheme={isDarkTheme}>
          {Object.keys(tree).length !== 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer"
              }}
              onClick={launchEditor}
            >
              <Icon
                icon={Images.codeEditorIcon}
                handleClick={this.launchEditor}
                height="24px"
                width="24px"
              />
              <div
                className="add-flow-description"
                style={{
                  paddingLeft: "inherit",
                  marginLeft: "10px",
                  marginBottom: "10px",
                  color: isDarkTheme ? "#B0B1B9" : "#000000"
                }}
              >
                Launch in Editor
              </div>
            </div>
          ) : null}
        </ColumnFooter>
      </div>
    );
  }
}

Aside.defaultProps = {
  channels: []
};

Aside.propTypes = {
  selectProjectDir: PropTypes.func.isRequired,
  tree: PropTypes.any.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array,
  selectChannelOrFile: PropTypes.func.isRequired,
  getNumberOfThreads: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  activeNode: PropTypes.any,
  handleDeleteChannel: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  launchEditor: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
};

export default Aside;
