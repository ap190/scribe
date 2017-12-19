import React, { Component } from "react";
import PropTypes from "prop-types";
import Switch from "./switch";
import "./index.css";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { on: props.value };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  }
  render() {
    const on = this.props.value;
    return <Switch on={on} onClick={this.toggle} />;
  }
}

Toggle.defaultProps = {
  onToggle: () => {}
};

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Toggle;
