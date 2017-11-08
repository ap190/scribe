import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import ThreadColumn from "../ThreadColumn/thread-column.component";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Aside = styled.div`
  display: flex;
  height: 100%;
  background-color: whitesmoke;
  flex: 1;
`;

const Editor = styled.div`
  display: flex;
  height: 100%;
  background-color: cyan;
  flex: ${props => (props.toggled ? 1 : 0.5)};
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "you"
    };
  }
  render() {
    return (
      <Wrapper>
        <Aside />
        <ThreadColumn />
        <Editor />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
