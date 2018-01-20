import React from "react";
import PropTypes from "prop-types";
import Highlighter from "../Highlighter";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";
import "./thread.css";

const getTheme = isDark => {
  return {
    deleteThreadIcon: isDark
      ? darkTheme.threads.deleteThread
      : lightTheme.threads.deleteThread
  };
};

const Thread = props => (
  <div
    className="thread-container"
    style={
      props.selected
        ? {}
        : {
            opacity: "0.5"
          }
    }
    onClick={() => props.selectThread(props)}
  >
    <Highlighter
      threadId={props.id}
      highlightColor={props.highlightColor}
      toggleModal={props.toggleModal}
    />
    <div className="thread-content">
      <div
        className="title"
        style={{
          color: props.darkTheme
            ? darkTheme.threads.color
            : lightTheme.threads.color
        }}
      >
        {props.title}
      </div>
      <div
        className="date"
        style={{
          color: props.darkTheme
            ? darkTheme.threads.color
            : lightTheme.threads.color
        }}
      >
        {props.date}
      </div>
      <div
        className="body-content"
        style={{
          color: props.darkTheme
            ? darkTheme.threads.color
            : lightTheme.threads.color
        }}
      >
        {props.text}
      </div>
    </div>
    <div className="delete-container">
      <img
        className="delete-icon"
        src={getTheme(props.darkTheme).deleteThreadIcon}
        onClick={() => props.onDeleteThreadHandler(props.channelId, props.id)}
        alt="Delete a thread button"
      />
    </div>
  </div>
);

Thread.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteThreadHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  highlightColor: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  selectThread: PropTypes.func.isRequired,
  channelId: PropTypes.any,
  darkTheme: PropTypes.bool.isRequired
};

export default Thread;
