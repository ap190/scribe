import React, { Component } from "react";
import Thread from "../Thread/thread.component";

const divStyle = {
  display: "flex",
  height: "auto",
  padding: "10px",
  backgroundColor: "purple",
  justifyContent: "center",
  margin: "10px",
  marginTop: "20px",
  flexDirection: "column"
};

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  render() {
    return (
      <div style={divStyle}>
        <h3>Threads List</h3>
        {this.state.threads.map(thread => (
          <Thread
            text={thread.text}
            title={thread.title}
            date={thread.date}
            key={thread.title}
          />
        ))}
      </div>
    );
  }
}

export default ThreadList;
