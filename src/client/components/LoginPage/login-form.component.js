import React, { Component } from "react";
import cx from "classnames";
import styled from "styled-components";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { graphCoolConstants } from "../../utils/const";
import { Images } from "../../themes";
import "./login.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const Section = styled.div`
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
  background: transparent;
  padding-left: 6px;
  color: white;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

ipcRenderer.on("auto-update", (event, text) => console.log(`${text}`));

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      inputsAble: true,
      failedLogIn: false
    };
    this.saveUserData = this.saveUserData.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.syncToCloud = this.syncToCloud.bind(this);
  }

  componentDidMount() {
    console.log("component did mount in login pform");
  }

  // User with unique id of email and password
  async authenticateUser() {
    this.setState({ ...this.state, inputsAble: false });
    const { email, password } = this.state;
    let response;
    try {
      response = await this.props.authenticateUserMutation({
        variables: { email, password }
      });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, inputsAble: true, failedLogIn: true });
      return;
    }
    console.log(response.data.authenticateUser);
    localStorage.setItem(
      "graphcoolToken",
      response.data.authenticateUser.token
    );
    this.props.history.push({
      pathname: "/home",
      state: { userData: response.data.authenticateUser }
    });
  }

  saveUserData(id, token) {
    const { GC_USER_ID, GC_AUTH_TOKEN } = graphCoolConstants;
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }

  syncToCloud(e) {
    let data = new FormData();
    console.log(`file si `, e.target.files[0]);
    data.append("data", e.target.files[0]);
    axios
      .post("https://api.graph.cool/file/v1/cjb6feu9323cp0133gc3vuant", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("file upload response", response);
      })
      .catch(err => console.log(`Err msg is ${err}`));
  }

  render() {
    return (
      <div>
        <Section>
          <div
            className={cx(
              "input-container",
              this.state.inputsAble ? "able" : "disabled"
            )}
          >
            <img src={Images.userIcon} alt="username" height="15" width="15" />
            <Input
              type="text"
              placeholder="email"
              className="textfield"
              onChange={e => this.setState({ email: e.target.value })}
              disabled={!this.state.inputsAble}
            />
          </div>
        </Section>
        <Section>
          <div
            className={cx(
              "input-container",
              this.state.inputsAble ? "able" : "disabled"
            )}
          >
            <img src={Images.lockIcon} alt="lock" height="15" width="15" />
            <Input
              type="text"
              alt="password"
              placeholder="password"
              className="password"
              onChange={e => this.setState({ password: e.target.value })}
              disabled={!this.state.inputsAble}
            />
          </div>
        </Section>
        <Section>
          <button
            className="btn btn-primary login-button"
            onClick={this.authenticateUser}
            disabled={!this.state.inputsAble}
          >
            Login
          </button>
        </Section>
        <Section>
          <div className="sign-up-container">
            Don't have an account?
            <div className="sign-up" onClick={this.props.toggleForms}>
              Sign up here!
            </div>
          </div>
        </Section>
        <Section>
          {this.state.failedLogIn ? (
            <div className="error-msg">
              Incorrect email or password. Please try again.
            </div>
          ) : null}
        </Section>
      </div>
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
)(LoginForm);
