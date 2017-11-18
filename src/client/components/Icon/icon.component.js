import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Img = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const Icon = ({ icon, handleClick }) => {
  return (
    <div onClick={handleClick}>
      <Img src={icon} alt="Add a flow button" />
    </div>
  );
};

Icon.propTypes = {
  handleIconClick: PropTypes.func,
  icon: PropTypes.string.isRequired
};

export default Icon;
