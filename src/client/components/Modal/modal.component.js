import React from "react";
import PropTypes from "prop-types";
import "./modal.css";

const backdropStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  padding: 50,
  zIndex: 10
};

const Modal = props =>
  props.show ? (
    <div className="backdrop" style={backdropStyle}>
      {props.children}
    </div>
  ) : null;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default Modal;
