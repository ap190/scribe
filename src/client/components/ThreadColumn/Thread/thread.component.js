import React from "react";
import PropTypes from "prop-types"; // ES6
import "./thread.css";

const deleteIcon = "./assets/icons/delete.png";

const Thread = props => (
  <div className="thread-container">
    <div>
      <div className="title">{props.title}</div>
      <div className="date">{props.date}</div>
      <div className="body-content">{props.text}</div>
    </div>
    <div>
      <img
        className="delete-icon"
        src={deleteIcon}
        onClick={() => props.onDeleteThreadHandler(props.id)}
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
  onDeleteThreadHandler: PropTypes.func.isRequired
};

export default Thread;
