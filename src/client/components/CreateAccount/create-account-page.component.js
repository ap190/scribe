import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import LoginContainer from "../../containers/Login";
import { graphCoolConstants } from "../../utils/const";
import "./style.css";

const Background = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-grow: 1;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  margin-top: 14px;
`;

const Input = styled.input`
  display: flex;
  min-width: 240px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  outline: none;
  font-size: 16px;
  line-height: 22px;
  padding: 6px 12px 6px 12px;
  border: none;
  &:focus {
    outline: none;
  }
`;

class CreateAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: "",
      password: "",
      name: ""
    };
    this.confirm = this.confirm.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }
  async confirm() {}
  saveUserData(id, token) {
    const { GC_USER_ID, GC_AUTH_TOKEN } = graphCoolConstants;
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }
  render() {
    return (
      <Background>
        <div className="left-image" />
        <Form>
          <Section>
            <div className="title">Create New Account</div>
          </Section>

          <Section>
            <Input type="text" placeholder="email" className="textfield" />
          </Section>
          <Section>
            <Input type="text" placeholder="password" className="textfield" />
          </Section>
          <Section>
            <Input
              type="text"
              placeholder="confirm  password"
              className="textfield"
            />
          </Section>

          <Section>
            <button
              className="btn btn-primary"
              onClick={() => console.log("Creating account...")}
            >
              Create Account
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/")}
            >
              Have an account? Log in
            </button>
          </Section>
        </Form>
      </Background>
    );
  }
}

export default compose(LoginContainer)(CreateAccountPage);
