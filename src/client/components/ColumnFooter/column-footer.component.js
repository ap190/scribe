import React from 'react';
import styled from "styled-components"
import {Colors} from "../../themes" 

export default styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 20px;
  background-color: ${Colors.actionPrimary};
`