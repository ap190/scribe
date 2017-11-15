import React from "react";
import PropTypes from "prop-types"; // ES6
import "./create-flow.css";

const addFlowIcon = "./assets/icons/simple_add.png";

const CreateFlow = props =>
  props.isModalOpen ? null : (
    <div className="footer-menu">
      <img
        className="add-flow-icon"
        src={addFlowIcon}
        alt="Add a flow button"
        onClick={props.onAddThreadHandler}
      />
      <div className="add-flow-description">Start a Flow</div>
    </div>
  );

CreateFlow.propTypes = {
  onAddThreadHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired
};

export default CreateFlow;
