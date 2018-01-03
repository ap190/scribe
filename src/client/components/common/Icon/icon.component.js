import React from "react";
import PropTypes from "prop-types";

const computeStyle = (h, w) => {
  return {
    width: w,
    height: h,
    cursor: "pointer"
  };
};

const Icon = ({ icon, handleClick, height, width }) => (
  <div onClick={handleClick}>
    <img
      src={icon}
      style={computeStyle(height, width)}
      alt="Add a flow button"
    />
  </div>
);

Icon.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};

Icon.defaultProps = {
  height: "14px",
  width: "14px"
};

export default Icon;
