import React, { Component } from "react";
import path from "path";
import PropTypes from "prop-types";
import CodeMirror from "@skidding/react-codemirror";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/xml/xml");
require("codemirror/mode/markdown/markdown");
require("codemirror/theme/monokai.css");
require("./code-column.css");

class CodeColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value
    });
  }

  render() {
    const options = {
      mode: "javascript",
      theme: "monokai"
    };
    const value =
      (this.props.currentFiles && this.props.currentFiles.filePath) ||
      "Loading...";
    return (
      <div
        style={{
          height: "100%",
          width: "550px",
          fontSize: "16px",
          overflow: "auto",
          flex: "1"
        }}
      >
        <CodeMirror
          value={value}
          onChange={this.updateCode}
          options={options}
          height="100%"
        />
      </div>
    );
  }
}

CodeColumn.propTypes = {
  fetchSelectedFileContent: PropTypes.func.isRequired,
  activeNode: PropTypes.any,
  absolutePath: PropTypes.string,
  currentFiles: PropTypes.any
};

export default CodeColumn;
