import React from "react";
import PropTypes from "prop-types";
import "./create-flow.css";

const addFlowIcon = "./assets/icons/simple_add.png";

const CreateFlow = props =>
  props.isModalOpen ? null : (
    <div className="footer-menu">
      <img
        className="add-flow-icon"
        src={addFlowIcon}
        alt="Add a flow button"
        onClick={() => props.handleAddThread(props.threads)}
      />
      <div className="add-flow-description">Start a Flow</div>
    </div>
  );

CreateFlow.propTypes = {
  handleAddThread: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  threads: PropTypes.array
};

export default CreateFlow;
