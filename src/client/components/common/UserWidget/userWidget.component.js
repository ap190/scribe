import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import UserDetails from "../UserDetails";
import "./userWidget.css";

const UserWidget = props => (
  <div className="userWidgetContainer">
    <UserAvatar firstName={props.firstName} lastName={props.lastName} />
    <UserDetails
      firstName={props.firstName}
      lastName={props.lastName}
      email={props.email}
    />
  </div>
);

UserWidget.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string
};

UserWidget.defaultProps = {
  firstName: "Elon",
  lastName: "Musk",
  email: "sapcex@gmail.com"
};

export default UserWidget;
