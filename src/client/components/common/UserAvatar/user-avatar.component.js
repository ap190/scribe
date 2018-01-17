import React from "react";
import PropTypes from "prop-types";
import lightTheme from "../../../themes/light-theme";
import darkTheme from "../../../themes/dark-theme";
import "./userAvatar.css";

const getInitial = (first, last) => first[0] + last[0];
const getTheme = isDarkTheme => {
  return {
    color: isDarkTheme
      ? darkTheme.aside.userAvatar.color
      : lightTheme.aside.userAvatar.color,
    backgroundImage: isDarkTheme
      ? darkTheme.aside.userAvatar.backgroundColor
      : lightTheme.aside.userAvatar.backgroundColor
  };
};

const UserAvatar = props => (
  <div className="userAvatarContainer" style={getTheme(props.darkTheme)}>
    {getInitial(props.firstName, props.lastName)}
  </div>
);

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  darkTheme: PropTypes.bool
};

UserAvatar.defaultProps = {
  firstName: "Elon",
  lastName: "Musk"
};

export default UserAvatar;
