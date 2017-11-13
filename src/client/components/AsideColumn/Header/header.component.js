import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <div className="aside-title-container">
    {props.title}
    <img
      className="header-icon"
      src={props.source}
      alt="Add a channel button"
      onClick={() =>
        "modalType" in props ? props.handler(props.modalType) : props.handler()}
    />
  </div>
);

Header.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  toggleModal: PropTypes.func,
  handler: PropTypes.func.isRequired
};

export default Header;
