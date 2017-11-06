import React, { Component } from "react";

export default WrappedComponent => {
  class Home extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Home;
};
