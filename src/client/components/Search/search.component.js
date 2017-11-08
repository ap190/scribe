import React, { Component } from "react";

const divStyle = {
  height: "30px",
  padding: "10px",
  backgroundColor: "pink",
  margin: "10px",
  marginTop: "20px",
  borderRadius: "5px"
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  render() {
    return (
      <input type="text" style={divStyle} placeholder="Search with terms..." />
    );
  }
}

export default Search;
