import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <div className="aside-title-container">
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
  handler: PropTypes.func.isRequired
};

export default Header;
