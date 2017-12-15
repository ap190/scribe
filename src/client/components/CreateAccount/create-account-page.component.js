import React, { Component } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
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
      login: false,
      email: "",
      password: "",
      name: ""
    };
    this.confirm = this.confirm.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  async confirm() {
    const { name, email, password } = this.state;
    console.log(this.state);
    if (this.state.login) {
      const result = await this.props.authenticateUserMutation({
        variables: {
          email,
          password
        }
      });
      const { id, token } = result.data.authenticateUser;
      this.saveUserData(id, token);
    } else {
      const result = await this.props.signupUserMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { id, token } = result.data.signupUser;
      this.saveUserData(id, token);
    }
    this.props.history.push(`/home`);
  }

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
            <Input
              type="text"
              placeholder="name"
              className="textfield"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Section>
          <Section>
            <Input
              type="text"
              placeholder="email"
              className="textfield"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Section>
          <Section>
            <Input
              type="text"
              placeholder="password"
              className="textfield"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Section>
          <Section>
            <Input
              type="text"
              placeholder="confirm  password"
              className="textfield"
            />
          </Section>
          <Section>
            <button className="btn btn-primary" onClick={() => this.confirm()}>
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

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: "signupUserMutation" }),
  graphql(AUTHENTICATE_USER_MUTATION, { name: "authenticateUserMutation" })
)(CreateAccountPage);