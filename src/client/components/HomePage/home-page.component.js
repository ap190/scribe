import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import ThreadColumn from "../ThreadColumn/Threads/threads.component";
import Aside from "../AsideColumn/aside.component";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Editor = styled.div`
  display: flex;
  height: 100%;
  background-color: cyan;
  flex: ${props => (props.toggled ? 3 : 2)};
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorToggled: false
    };
  }
  render() {
    return (
      <Wrapper>
        <Aside isEditorToggled={this.state.isEditorToggled} />
        <ThreadColumn isEditorToggled={this.state.isEditorToggled} />
        <Editor isEditorToggled={this.state.isEditorToggled} />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
