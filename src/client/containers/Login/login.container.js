import React, { Component } from "react";
import { compose } from "recompose";

export default WrappedComponent => {
  class Login extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Login;
};
