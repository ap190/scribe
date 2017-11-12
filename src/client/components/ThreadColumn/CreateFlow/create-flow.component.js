import React from "react";

const addFlowIcon = "./assets/icons/simple_add.png";

const iconStyling = {
  height: "14px",
  width: "14px",
  padding: "10px"
};

const textStyling = {
  fontFamily: "AvenirNext-Medium",
  fontSize: "14px",
  color: "#000000",
  lineHeight: "30px",
  marginTop: "4px"
};

const CreateFlow = () => (
  <div className="footer-menu">
    <img style={iconStyling} src={addFlowIcon} alt="Add a flow button" />
    <div style={textStyling}>Start a Flow</div>
  </div>
);

export default CreateFlow;
