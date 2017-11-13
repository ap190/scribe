import UUIDv4 from "uuid/v4";
import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateFlow from "../CreateFlow/create-flow.component";
import Search from "../Search/search.component";
import ThreadList from "../ThreadList/thread-list.component";

const divStyle = {
  height: "100%",
  backgroundColor: "white",
  overflowY: "auto"
};

class ThreadColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_thread: false,
      query: "",
      current_threads: [
        {
          text: "hey there~!",
          title: "giraffe",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey here!",
          title: "elephant",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4()
        }
      ]
    };
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onDeleteThread = this.onDeleteThread.bind(this);
    this.onAddThread = this.onAddThread.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value
    });
  }

  onDeleteThread(threadId) {
    this.setState({
      ...this.state,
      current_threads: this.state.current_threads.filter(
        thread => thread.id !== threadId
      )
    });
  }

  onAddThread() {
    /* Hard coded thread for now. */
    const newThread = {
      text: "new thread",
      title: "cute penguin",
      date: Date.now(),
      id: UUIDv4()
    };
    this.setState({
      ...this.state,
      current_threads: [newThread].concat(this.state.current_threads)
    });
  }

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "2" };
  }

  render() {
    return (
      <div style={{ ...divStyle, ...this.isEditorToggledStyles() }}>
        <Search
          query={this.state.query}
          onQueryChangeHandler={this.onQueryChange}
        />
        <ThreadList
          threads={this.state.current_threads}
          onDeleteThreadHandler={this.onDeleteThread}
          query={this.state.query}
        />
        <CreateFlow onAddThreadHandler={this.onAddThread} />
      </div>
    );
  }
}

ThreadColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired
};

export default ThreadColumn;
