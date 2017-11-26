import React from "react";
import PropTypes from "prop-types";
import "./ActionBarIcon.css";

const ActionBarIcon = ({ icon, handleClick, title }) => (
  <div className="icon-container" onClick={handleClick}>
    <div>
      <img className="icon" src={icon} alt="Add a flow button" />
    </div>
    <div className="icon-title">{title}</div>
  </div>
);

ActionBarIcon.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default ActionBarIcon;
