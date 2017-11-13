import React from "react";
import PropTypes from "prop-types"; // ES6
import "./create-flow.css";

const addFlowIcon = "./assets/icons/simple_add.png";

const CreateFlow = props => (
  <div className="parent footer-menu">
    <div className="footer-menu-items">
      <img
        className="add-flow-icon"
        src={addFlowIcon}
        alt="Add a flow button"
        onClick={props.onAddThreadHandler}
      />
      <div className="add-flow-description">Start a Flow</div>
    </div>
  </div>
);

CreateFlow.propTypes = {
  onAddThreadHandler: PropTypes.func.isRequired
};

export default CreateFlow;
