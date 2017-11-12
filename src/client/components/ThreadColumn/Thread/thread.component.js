import React from "react";
import PropTypes from "prop-types"; // ES6

const titleStyle = {
  fontFamily: "AvenirNext-Bold",
  fontSize: "24px",
  color: "#4A4A4A",
  lineHeight: "24px",
  marginTop: "14px"
};

const dateStyle = {
  fontFamily: "AvenirNext-Regular",
  fontSize: "10px",
  color: "#595959",
  lineHeight: "32px"
};

const bodyStyle = {
  fontFamily: "AvenirNext-Regular",
  fontSize: "18px",
  color: "#4A4A4A",
  lineHeight: "32px"
};

const containerStyle = {
  boxShadow: "inset 0 -1px 0 0 #d9d9d9",
  padding: "16px"
}

const Thread = props => (
  <div style={containerStyle} onClick={() => props.onDeleteThreadHandler(props.id)}>
    <div style={titleStyle}>{props.title}</div>
    <div style={dateStyle}>{props.date}</div>
    <div style={bodyStyle}>{props.text}</div>
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
