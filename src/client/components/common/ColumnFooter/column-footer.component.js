import styled from "styled-components";
import { Colors } from "../../../themes";

export default styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  padding: 20px;
  font-family: "AvenirNext-Bold";
  background-color: ${Colors.actionPrimary};
`;
