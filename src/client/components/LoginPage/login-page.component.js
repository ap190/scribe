import React, { Component } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { graphCoolConstants } from "../../utils/const";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const Background = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      failedLogIn: false
    };
    this.saveUserData = this.saveUserData.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFBLogin = this.handleFBLogin.bind(this);
    this.facebookCallback = this.facebookCallback.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on("fb-auth", (event, token, res) =>
      this.facebookCallback(token, res)
    );
  }

  handleFBLogin() {
    ipcRenderer.send("login-with-fb");
  }

  async facebookCallback(facebookToken, res) {
    let graphcoolResponse;
    console.log(`fb id is ${res.id}`);
    console.log(`name is ${res.name}`);
    console.log(`email is ${res.email}`);
    console.log(`pic url is `, res.picture.data.url);
    if (facebookToken) {
      try {
        graphcoolResponse = await this.props.authenticateFacebookUserMutation({
          variables: { facebookToken }
        });
      } catch (err) {
        console.log(`Error is ${err}`);
        this.setState({ failedLogIn: true });
      }
      console.log(graphcoolResponse.data);
      const graphcoolToken =
        graphcoolResponse.data.authenticateFacebookUser.token;
      localStorage.setItem("graphcoolToken", graphcoolToken);
      this.props.history.push("/home");
    } else {
      console.warn(`User did not authorize the Facebook application.`);
    }
  }

  // User with unique id of email and password
  async authenticateUser() {
    const { email, password } = this.state;
    let response;
    try {
      response = await this.props.authenticateUserMutation({
        variables: { email, password }
      });

      console.log("***********");
      console.log(response);
    } catch (err) {
      console.log(err);
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
            <button
              className="btn btn-primary"
              onClick={() => this.handleFBLogin()}
            >
              Log in with Facebook
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

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateFacebookUserMutation($facebookToken: String!) {
    authenticateFacebookUser(facebookToken: $facebookToken) {
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
  graphql(AUTHENTICATE_FACEBOOK_USER, {
    name: "authenticateFacebookUserMutation"
  }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: "loggedInUserQuery",
    options: { fetchPolicy: "network-only" }
  })
)(LoginPage);
