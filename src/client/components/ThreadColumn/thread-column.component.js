import React, { Component } from "react";
import Search from "../Search/search.component";
import ThreadList from "../ThreadList/thread-list.component";

const divStyle = {
  display: "flex",
  justifyContent: "flex-start",
  height: "100%",
  backgroundColor: "pink",
  flex: "1",
  flexDirection: "column"
};

class Threads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_thread: false
    };
  }
  render() {
    return (
      <div style={divStyle}>
        <Search />
        <ThreadList />
      </div>
    );
  }
}

export default Threads;
