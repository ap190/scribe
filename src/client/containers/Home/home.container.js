import React, { Component } from "react";

export default WrappedComponent => {
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggled: false
      };
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Home;
};
