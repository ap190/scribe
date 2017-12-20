import React from "react";
import PropTypes from "prop-types";

const Switch = ({ on, className = "", ...props }) => (
  <div className="toggle">
    <input className="toggle-input" type="checkbox" />
    <button
      className={`${className} toggle-btn ${
        on ? "toggle-btn-on" : "toggle-btn-off"
      }`}
      aria-expanded={on}
      {...props}
    />
  </div>
);

Switch.propTypes = {
  on: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired
};

export default Switch;
