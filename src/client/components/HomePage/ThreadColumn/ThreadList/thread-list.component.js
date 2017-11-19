import React from "react";
import PropTypes from "prop-types";
import Thread from "../Thread";

const divStyle = {
  height: "auto",
  justifyContent: "center",
  overflow: "auto",
  flex: "1",
  flexDirection: "column",
  paddingBottom: "60px"
};

const filterThreadListItem = (query, thread) =>
  thread.text.includes(query) || thread.title.includes(query);

const ThreadList = props =>
  !props.threads ? (
    <div style={divStyle} />
  ) : (
    <div style={divStyle}>
      <div
        className="thread-list-header"
        style={{
          fontFamily: "AvenirNext-Bold",
          padding: "10px"
        }}
      >
        {props.currentChannel.channelName || props.currentChannel.module}
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
                channelName={thread.channelName}
                onDeleteThreadHandler={props.onDeleteThreadHandler}
                toggleModal={props.toggleModal}
                highlightColor={thread.highlightColor}
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
      date: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      channelName: PropTypes.string,
      highlightColor: PropTypes.string.isRequired
    })
  ),
  selectThread: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onDeleteThreadHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  currentChannel: PropTypes.any
};

export default ThreadList;
