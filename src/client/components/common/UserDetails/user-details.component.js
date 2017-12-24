import React from "react";
import PropTypes from "prop-types";
import "./user-details.css";

const UserDetails = props => (
  <div className="userDetailsContainer">
    <div className="full-name">{`${props.firstName} ${props.lastName}`}</div>
    <div>{props.email}</div>
  </div>
);

UserDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string
};

export default UserDetails;
