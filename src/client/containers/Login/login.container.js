import React, { Component } from "react";

export default WrappedComponent => {
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        componentLoggedIn: false
      };
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Login;
};
