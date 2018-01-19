import React from "react";
import PropTypes from "prop-types";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getTheme = isDark => {
  return {
    color: isDark
      ? darkTheme.aside.channels.header.color
      : lightTheme.aside.channels.header.color
  };
};

const Header = props => (
  <div className="aside-title-container" style={getTheme(props.darkTheme)}>
    {props.title}
    <img
      className="header-icon"
      src={props.source}
      alt="Add a channel button"
      onClick={() => props.handler(props.modalType)}
    />
  </div>
);

Header.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  handler: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

export default Header;
