import React, { Component } from "react";
import PropTypes from "prop-types";
import ToggleButton from "react-toggle-button";
import { Images } from "../../../themes";
import CodeColumn from "../CodeColumn";
import Search from "./Search";
import ThreadList from "./ThreadList";
import ColumnFooter from "../../common/ColumnFooter";
import Icon from "../../common/Icon";
import { stringConstants } from "../../../utils/const";

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

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "1.2" };
  }

  render() {
    const {
      isModalOpen,
      handleAddThread,
      activeNode,
      showCode,
      currentFiles
    } = this.props;
    return (
      <div style={{ ...divStyle, ...this.isEditorToggledStyles() }}>
        {showCode ? (
          <CodeColumn currentFiles={currentFiles} />
        ) : (
          <div>
            <Search
              query={this.state.query}
              onQueryChangeHandler={this.onQueryChange}
            />
            <ThreadList
              threads={this.props.threads}
              onDeleteThreadHandler={this.onDeleteThread}
              shouldShowCode={this.props.showCode}
              query={this.state.query}
              toggleModal={this.props.toggleModal}
              toggleShoudShowCode={this.props.toggleShouldShowCode}
              selectThread={this.props.selectThread}
              currentChannel={this.props.currentChannel}
              handleDeleteThread={this.props.handleDeleteThread}
            />
          </div>
        )}
        {!isModalOpen && (
          <ColumnFooter>
            <div style={{ display: "flex", justifyContent: "flexStart" }}>
              <Icon icon={Images.addIcon} handleClick={handleAddThread} />
              <div
                className="add-flow-description"
                style={{
                  paddingLeft: "inherit",
                  marginLeft: "10px",
                  marginBottom: "10px"
                }}
              >
                {ADD_A_THREAD}
              </div>
            </div>
            {activeNode ? (
              <ToggleButton
                inactiveLabel={""}
                activeLabel={""}
                colors={{
                  activeThumb: { base: "rgb(250,250,250)" },
                  inactiveThumb: { base: "rgb(207,221,245)" },
                  active: {
                    base: "rgb(207,221,245)",
                    hover: "rgb(177, 191, 215)"
                  },
                  inactive: { base: "rgb(65,66,68)", hover: "rgb(95,96,98)" }
                }}
                thumbAnimateRange={[0, 36]}
                thumbIcon={<Icon icon={Images.codeIcon} />}
                value={this.props.showCode}
                onToggle={this.props.toggleShouldShowCode}
              />
            ) : null}
          </ColumnFooter>
        )}
      </div>
    );
  }
}

ThreadColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired,
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
  activeNode: PropTypes.any
};

export default ThreadColumn;
