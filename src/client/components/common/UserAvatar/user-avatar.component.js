import React from "react";
import PropTypes from "prop-types";
import "./userAvatar.css";

const getInitial = (first, last) => first[0] + last[0];

const UserAvatar = props => (
  <div className="userAvatarContainer">
    {getInitial(props.firstName, props.lastName)}
  </div>
);

UserAvatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

UserAvatar.defaultProps = {
  firstName: "Elon",
  lastName: "Musk"
};

export default UserAvatar;
