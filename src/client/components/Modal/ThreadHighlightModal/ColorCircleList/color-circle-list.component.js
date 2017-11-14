import React from "react";
import PropTypes from "prop-types";
import ColorCircle from "../ColorCircle/color-circle.component";
import "./color-circle-list.css";

const ColorCircleList = props => (
  <div className="colorList">
    {props.colors.map(color => (
      <ColorCircle
        onSelectCircleHandler={props.onSelectCircleHandler}
        selectedColor={props.currentHighlight}
        color={color}
      />
    ))}
  </div>
);

ColorCircleList.propTypes = {
  currentHighlight: PropTypes.string.isRequired,
  onSelectCircleHandler: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired
};

export default ColorCircleList;
