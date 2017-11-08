import React from "react";
import PropTypes from "prop-types"; // ES6

const Thread = props => (
  <div>
    <h3>{props.title}</h3>
    <div>{props.text}</div>
    <div>{props.date}</div>
  </div>
);

Thread.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
};

export default Thread;
