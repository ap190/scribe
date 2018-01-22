import React from "react";
import PropTypes from "prop-types";
import "./ActionBarIcon.css";
import lightTheme from "../../../themes/light-theme";
import darkTheme from "../../../themes/dark-theme";

const ActionBarIcon = ({ icon, handleClick, title, isDarkTheme }) => (
  <div className="icon-container" onClick={handleClick}>
    <div>
      <img className="icon" src={icon} alt="Add a flow button" />
    </div>
    <div
      className="icon-title"
      style={{
        color: isDarkTheme ? darkTheme.editor.color : lightTheme.editor.color
      }}
    >
      {title}
    </div>
  </div>
);

ActionBarIcon.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  isDarkTheme: PropTypes.bool.isRequired
};

export default ActionBarIcon;
