import React from "react";
import PropTypes from "prop-types";
import Highlighter from "../Highlighter";
import "./thread.css";

const deleteIcon = "./assets/icons/delete.png";

const Thread = props => (
  <div
    className="thread-container"
    style={props.selected ? { opacity: "0.5" } : {}}
    onClick={() => props.selectThread(props)}
  >
    <Highlighter
      threadId={props.id}
      highlightColor={props.highlightColor}
      toggleModal={props.toggleModal}
    />
    <div className="thread-content">
      <div className="title">{props.title}</div>
      <div className="date">{props.date}</div>
      <div className="body-content">{props.text}</div>
    </div>
    <div>
      <img
        className="delete-icon"
        src={deleteIcon}
        onClick={() => props.onDeleteThreadHandler(props.channelName, props.id)}
        alt="Delete a thread button"
      />
    </div>
  </div>
);

Thread.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteThreadHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  highlightColor: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  selectThread: PropTypes.func.isRequired,
  channelName: PropTypes.any
};

export default Thread;
