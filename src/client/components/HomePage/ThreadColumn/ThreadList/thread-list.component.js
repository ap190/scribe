import React from "react";
import PropTypes from "prop-types";
import Thread from "../Thread";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const divStyle = {
  height: "auto",
  justifyContent: "center",
  overflow: "auto",
  flex: "1",
  flexDirection: "column",
  paddingBottom: "60px"
};

const threadContainerTitle = {
  height: "auto",
  justifyContent: "space-between",
  overflow: "auto",
  flex: "1",
  display: "flex",
  padding: "10px",
  paddingLeft: "10px",
  paddingRight: "20px"
};

const filterThreadListItem = (query, thread) =>
  thread.text.includes(query) || thread.title.includes(query);

const ThreadList = props =>
  !props.threads ? (
    <div style={divStyle} />
  ) : (
    <div style={divStyle}>
      <div style={threadContainerTitle}>
        <div
          className="thread-list-header"
          style={{
            fontFamily: "AvenirNext-Bold",
            padding: "10px",
            color: props.darkTheme
              ? darkTheme.threads.color
              : lightTheme.threads.color
          }}
        >
          {props.currentChannel.channelName || props.currentChannel.module}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #979797" }}>
        {props.threads.map(
          thread =>
            filterThreadListItem(props.query, thread) ? (
              <Thread
                text={thread.text}
                title={thread.title}
                date={thread.date}
                key={thread.id}
                id={thread.id}
                selected={thread.selected}
                selectThread={props.selectThread}
                channelId={thread.channelId}
                onDeleteThreadHandler={props.handleDeleteThread}
                toggleModal={props.toggleModal}
                highlightColor={thread.highlightColor}
                darkTheme={props.darkTheme}
              />
            ) : null
        )}
      </div>
    </div>
  );

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      channelId: PropTypes.string,
      highlightColor: PropTypes.string.isRequired
    })
  ),
  selectThread: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  currentChannel: PropTypes.any,
  handleDeleteThread: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

export default ThreadList;
