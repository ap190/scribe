import React from "react";
import PropTypes from "prop-types"; // ES6

const titleStyle = {
  fontFamily: "AvenirNext-Bold",
  fontSize: "26px",
  color: "#4A4A4A",
  lineHeight: "24px"
};

const dateStyle = {
  fontFamily: "AvenirNext-Regular",
  fontSize: "14px",
  color: "#4A4A4A",
  lineHeight: "32px"
};

const bodyStyle = {
  fontFamily: "AvenirNext-Regular",
  fontSize: "26px",
  color: "#4A4A4A",
  lineHeight: "32px"
};

const Thread = props => (
  <div>
    <h3 style={titleStyle}>{props.title}</h3>
    <div style={dateStyle}>{props.date}</div>
    <div style={bodyStyle}>{props.text}</div>
  </div>
);

Thread.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
};

export default Thread;
