import React, { Component } from "react";
import path from "path";
import PropTypes from "prop-types";
import CodeColumn from "../CodeColumn";
import Search from "./Search";
import ThreadList from "./ThreadList";
import Toggle from "../../common/Toggle";
import ColumnFooter from "../../common/ColumnFooter";
import Icon from "../../common/Icon";
import { stringConstants } from "../../../utils/const";
import darkTheme from "../../../themes/dark-theme";
import lightTheme from "../../../themes/light-theme";

const divStyle = {
  position: "relative",
  height: "100%",
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  borderLeft: "1px solid #979797",
  zIndex: "2"
};

const { ADD_A_THREAD } = stringConstants;

class ThreadColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value
    });
  }

  render() {
    const {
      isModalOpen,
      handleAddThread,
      activeNode,
      showCode,
      currentFiles,
      absolutePath,
      threads,
      isDarkTheme
    } = this.props;
    let fileData = "";
    if (absolutePath && activeNode) {
      fileData = currentFiles.get(
        path.join(absolutePath, activeNode.relativePath.join(`/`))
      );
    }
    return (
      <div
        style={{
          ...divStyle,
          backgroundColor: isDarkTheme
            ? darkTheme.threads.backgroundColor
            : lightTheme.threads.backgroundColor
        }}
      >
        {showCode ? (
          <CodeColumn currentFiles={fileData} />
        ) : (
          <div>
            <Search
              query={this.state.query}
              onQueryChangeHandler={this.onQueryChange}
              darkTheme={isDarkTheme}
            />
            <ThreadList
              threads={threads}
              onDeleteThreadHandler={this.onDeleteThread}
              shouldShowCode={this.props.showCode}
              query={this.state.query}
              toggleModal={this.props.toggleModal}
              toggleShoudShowCode={this.props.toggleShouldShowCode}
              selectThread={this.props.selectThread}
              currentChannel={this.props.currentChannel}
              handleDeleteThread={this.props.handleDeleteThread}
              darkTheme={isDarkTheme}
            />
          </div>
        )}
        {!isModalOpen && threads !== undefined ? (
          <ColumnFooter darkTheme={isDarkTheme}>
            <div style={{ display: "flex", justifyContent: "flexStart" }}>
              <Icon
                icon={
                  isDarkTheme
                    ? darkTheme.icons.addThread
                    : lightTheme.icons.addThread
                }
                handleClick={handleAddThread}
              />
              <div
                className="add-flow-description"
                style={{
                  paddingLeft: "inherit",
                  marginLeft: "10px",
                  marginBottom: "10px",
                  color: isDarkTheme
                    ? darkTheme.columnFooter.color
                    : lightTheme.columnFooter.color
                }}
              >
                {ADD_A_THREAD}
              </div>
            </div>
            {activeNode ? (
              <Toggle
                value={this.props.showCode}
                onToggle={this.props.toggleShouldShowCode}
              />
            ) : null}
          </ColumnFooter>
        ) : (
          <ColumnFooter darkTheme={isDarkTheme} />
        )}
      </div>
    );
  }
}

ThreadColumn.propTypes = {
  currentChannel: PropTypes.any,
  currentFiles: PropTypes.any,
  threads: PropTypes.any,
  toggleModal: PropTypes.func.isRequired,
  toggleShouldShowCode: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  selectThread: PropTypes.func.isRequired,
  handleAddThread: PropTypes.func.isRequired,
  handleDeleteThread: PropTypes.func.isRequired,
  showCode: PropTypes.bool.isRequired,
  absolutePath: PropTypes.string,
  activeNode: PropTypes.any,
  isDarkTheme: PropTypes.bool.isRequired
};

export default ThreadColumn;
