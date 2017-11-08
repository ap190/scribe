import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  display: "flex",
  height: "100%",
  backgroundColor: "whitesmoke",
  flex: "0.5"
};

class Aside extends Component {
  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "0.5" };
  }
  render() {
    return <div style={{ ...styles, ...this.isEditorToggledStyles() }} />;
  }
}

Aside.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired
};

export default Aside;
