import React from "react";
import PropTypes from "prop-types";
import { HIGHLIGHT_THREAD_MODAL } from "../../../utils/const";

const styles = {
  height: "100px",
  width: "5px",
  borderRadius: "25px",
  cursor: "pointer"
};

const Highlighter = props => (
  <div
    style={{ ...styles, backgroundColor: props.highlightColor }}
    onClick={() =>
      props.toggleModal(HIGHLIGHT_THREAD_MODAL, {
        threadColor: props.highlightColor
      })
    }
  />
);

Highlighter.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  highlightColor: PropTypes.string.isRequired
};

export default Highlighter;
