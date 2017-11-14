import React from "react";
import PropTypes from "prop-types";
import "./color-circle.css";

const highlightedStyle = {
  boxShadow: "0 0 5px rgba(81, 203, 238, 1)",
  border: "1px solid rgba(81, 203, 238, 1)"
};

const ColorCircle = props =>
  props.selectedColor !== props.color ? (
    <div
      className="colorCircle"
      style={{ backgroundColor: props.color }}
      onClick={() => props.onSelectCircleHandler(props.color)}
    />
  ) : (
    <div
      className="colorCircle"
      style={{ backgroundColor: props.color, ...highlightedStyle }}
      onClick={() => props.onSelectCircleHandler(props.color)}
    />
  );

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  onSelectCircleHandler: PropTypes.func.isRequired
};

export default ColorCircle;
