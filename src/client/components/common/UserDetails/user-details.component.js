import React from "react";
import PropTypes from "prop-types";
import darkTheme from "../../../themes/dark-theme";
import lightTheme from "../../../themes/light-theme";
import "./user-details.css";

const getTheme = isDarkTheme => {
  return {
    color: isDarkTheme
      ? darkTheme.aside.userAvatar.userDetails.color
      : lightTheme.aside.userAvatar.userDetails.color
  };
};

const UserDetails = props => (
  <div className="userDetailsContainer" style={getTheme(props.darkTheme)}>
    <div className="full-name">{`${props.firstName} ${props.lastName}`}</div>
    <div>{props.email}</div>
  </div>
);

UserDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  darkTheme: PropTypes.bool.isRequired
};

export default UserDetails;
