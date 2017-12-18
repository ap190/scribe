import React from "react";
import PropTypes from "prop-types";
import { modals } from "../../../../utils/const";

const { HIGHLIGHT_THREAD_MODAL } = modals;
const styles = {
  minHeight: "100px",
  width: "5px",
  minWidth: "5px",
  borderRadius: "25px",
  cursor: "pointer"
};

const Highlighter = props => (
  <div
    style={{ ...styles, backgroundColor: props.highlightColor }}
    onClick={() =>
      props.toggleModal(HIGHLIGHT_THREAD_MODAL, {
        threadColor: props.highlightColor,
        threadId: props.threadId
      })
    }
  />
);

Highlighter.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  highlightColor: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired
};

export default Highlighter;
