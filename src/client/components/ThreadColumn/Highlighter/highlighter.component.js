import React from "react";
import PropTypes from "prop-types";
import { HIGHLIGHT_THREAD_MODAL } from "../../../utils/const";

const styles = {
  height: "100px",
  width: "5px",
  backgroundColor: "pink",
  borderRadius: "25px",
  cursor: "pointer"
};

const Highlighter = props => (
  <div
    style={styles}
    onClick={() => props.toggleModal(HIGHLIGHT_THREAD_MODAL)}
  />
);

Highlighter.propTypes = {
  toggleModal: PropTypes.func.isRequired
};

export default Highlighter;
