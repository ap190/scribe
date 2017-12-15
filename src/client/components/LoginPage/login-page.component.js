import React, { Component } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { graphCoolConstants } from "../../utils/const";

const Background = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

//this.props.history.push("/home");
const LeftImage = styled.div`
  background-image: url("https://images.unsplash.com/photo-1419407118704-43ccfda4036d?auto=format&fit=crop&w=2001&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex: 0.7;
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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      failedLogIn: false
    };
    this.saveUserData = this.saveUserData.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  async authenticateUser() {
    const { email, password } = this.state;
    let response;
    try {
      response = await this.props.authenticateUserMutation({
        variables: { email, password }
      });
    } catch (err) {
      this.setState({ failedLogIn: true });
    }
    localStorage.setItem(
      "graphcoolToken",
      response.data.authenticateUser.token
    );
    this.props.history.push("/home");
  }

  saveUserData(id, token) {
    const { GC_USER_ID, GC_AUTH_TOKEN } = graphCoolConstants;
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }
  render() {
    return (
      <Background>
        <LeftImage />
        <Form>
          <Section>
            <div className="title">Log In</div>
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
          {this.state.failedLogIn ? (
            <h3>Incorrect email or password. Please try again. </h3>
          ) : null}
          <Section>
            <button className="btn btn-primary" onClick={this.authenticateUser}>
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/createAccount")}
            >
              Create Account
            </button>
          </Section>
        </Form>
      </Background>
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`;
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: "authenticateUserMutation" }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: "loggedInUserQuery",
    options: { fetchPolicy: "network-only" }
  })
)(LoginPage);
