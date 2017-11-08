import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import Aside from "../Aside/aside.component";
import ThreadColumn from "../ThreadColumn/thread-column.component";

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
        <Aside isEditorToggled={this.isEditorToggled} />
        <ThreadColumn isEditorToggled={this.isEditorToggled} />
        <Editor isEditorToggled={this.isEditorToggled} />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
