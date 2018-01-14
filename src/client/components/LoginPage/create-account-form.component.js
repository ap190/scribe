import React, { Component } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Images } from "../../themes";
import { graphCoolConstants } from "../../utils/const";

const Section = styled.div`
  position: relative;
  display: flex;
  margin-top: 14px;
`;

const Input = styled.input`
  display: flex;
  font-family: "AvenirNext-Regular";
  outline: none;
  border: none;
  width: 90%;
  font-size: 14px;
  padding-left: 8px;
  color: "#33235f";
  &:focus {
    outline: none;
  }
`;

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
    this.confirm = this.confirm.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  async confirm() {
    const { firstName, lastName, email, password } = this.state;
    const result = await this.props.signupUserMutation({
      variables: {
        firstName,
        lastName,
        email,
        password
      }
    });
    const { id, token } = result.data.signupUser;
    this.saveUserData(id, token);
    this.props.history.push({
      pathname: "/home",
      state: { userData: result.data.signupUser }
    });
  }

  saveUserData(id, token) {
    const { GC_USER_ID, GC_AUTH_TOKEN } = graphCoolConstants;
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }

  render() {
    return (
      <div>
        <Section>
          <div className="input-container">
            <Input
              type="text"
              placeholder="First Name"
              className="textfield"
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </div>
        </Section>
        <Section>
          <div className="input-container">
            <Input
              type="text"
              placeholder="Last Name"
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </div>
        </Section>
        <Section>
          <div className="input-container">
            <Input
              type="text"
              placeholder="email"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
        </Section>
        <Section>
          <div className="input-container">
            <Input
              type="text"
              placeholder="password"
              className="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <img src={Images.lockIcon} alt="password" height="15" width="15" />
          </div>
        </Section>
        <Section>
          <div className="input-container">
            <Input
              type="text"
              placeholder="confirm  password"
              className="password"
            />
            <img src={Images.lockIcon} alt="password" height="15" width="15" />
          </div>
        </Section>
        <Section>
          <button
            className="btn btn-primary login-button"
            onClick={() => this.confirm()}
          >
            Create Account
          </button>
        </Section>
        <Section>
          <div className="sign-up-container">
            Have an account?
            <div className="sign-up" onClick={this.props.toggleForms}>
              Log in
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signupUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      token
      email
      firstName
      lastName
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: "signupUserMutation" })
)(CreateAccountForm);
