import React, { Component } from "react";
import styled from "styled-components";
import Typing, { Reset, Cursor } from "react-typing-animation";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Images } from "../../themes";
import LoginForm from "./login-form.component";
import CreateAccountForm from "./create-account-form.component";
import "./login.css";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  // background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 20px;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  margin-top: 14px;
`;

const Background = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
  -webkit-app-region: drag;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      failedLogIn: false,
      showLoginForm: true
    };
    this.toggleForms = this.toggleForms.bind(this);
  }

  toggleForms() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }

  render() {
    return (
      <Background
        style={{
          backgroundImage: `url(${Images.devImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Typing
          loop={true}
          speed={120}
          className="typed-title"
          cursor={<Cursor className="cursor" />}
        >
          <span>Clarify your code.</span>
          <Reset count={1} delay={4500} />
          <span>Get started using Scribe.</span>
          <Reset count={1} delay={4500} />
        </Typing>
        <Form>
          <Section>
            <img
              alt="login-graphic"
              src={Images.logoIcon}
              height="100"
              width="100"
            />
          </Section>
          {this.state.showLoginForm ? (
            <LoginForm
              history={this.props.history}
              toggleForms={this.toggleForms}
            />
          ) : (
            <CreateAccountForm
              history={this.props.history}
              toggleForms={this.toggleForms}
            />
          )}
        </Form>
      </Background>
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
      firstName
      lastName
      email
    }
  }
`;

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateFacebookUserMutation($facebookToken: String!) {
    authenticateFacebookUser(facebookToken: $facebookToken) {
      token
    }
  }
`;

// const LOGGED_IN_USER_QUERY = gql`
//   query LoggedInUserQuery {
//     loggedInUser {
//       id
//     }
//   }
// `;

export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: "authenticateUserMutation" }),
  graphql(AUTHENTICATE_FACEBOOK_USER, {
    name: "authenticateFacebookUserMutation"
  })
  // graphql(LOGGED_IN_USER_QUERY, {
  //   name: "loggedInUserQuery",
  //   options: { fetchPolicy: "network-only" }
  // })
)(LoginPage);
