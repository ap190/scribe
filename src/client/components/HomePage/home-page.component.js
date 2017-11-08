import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import ThreadColumn from "../ThreadColumn/Threads/threads.component";
import Aside from "../AsideColumn/aside.component";
import Editor from "../EditorColumn/editor.component";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorToggled: false
    };
    this.toggleEditor = this.toggleEditor.bind(this);
  }
  toggleEditor() {
    console.log(this.state.isEditorToggled);
    this.setState({
      ...this.state,
      isEditorToggled: !this.state.isEditorToggled
    });
  }
  render() {
    return (
      <Wrapper>
        <Aside isEditorToggled={this.state.isEditorToggled} />
        <ThreadColumn isEditorToggled={this.state.isEditorToggled} />
        <Editor
          isEditorToggled={this.state.isEditorToggled}
          toggleHandler={this.toggleEditor}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
