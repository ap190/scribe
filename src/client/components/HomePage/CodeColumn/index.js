import React, { Component } from "react";
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
          value={`const component = {
            name: "react-codemirror",
            author: "Jed Watson",
            repo: "https://github.com/JedWatson/react-codemirror"
          };
          const component2 = {
            name: "react-codemirror",
            author: "Jed Watson",
            repo: "https://github.com/JedWatson/react-codemirror"
          };
          const test1 = {
            name: "react-codemirror",
            author: "Jed Watson",
            repo: "https://github.com/JedWatson/react-codemirror"
          };`}
          onChange={this.updateCode}
          options={options}
          height="100%"
        />
      </div>
    );
  }
}

CodeColumn.propTypes = {};

export default CodeColumn;
