import React, { Component } from "react";
import Search from "../Search/search.component";
import ThreadList from "../ThreadList/thread-list.component";

const divStyle = {
  display: "flex",
  justifyContent: "flex-start",
  height: "100%",
  backgroundColor: "pink",
  flex: "1.5",
  flexDirection: "column"
};

class Threads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_thread: false,
      query: "",
      threads: [
        {
          text: "hey there~!",
          title: "giraffe",
          date: Date.now()
        },
        {
          text: "hey here!",
          title: "elephant",
          date: Date.now()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now()
        }
      ]
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value,
      threads: this.state.threads.filter(
        thread =>
          thread.text.includes(event.target.value) ||
          thread.title.includes(event.target.value)
      )
    });
  }

  render() {
    return (
      <div style={divStyle}>
        <Search
          query={this.state.query}
          onQueryChangeHandler={this.onQueryChange}
        />
        <ThreadList threads={this.state.threads} />
      </div>
    );
  }
}

export default Threads;
