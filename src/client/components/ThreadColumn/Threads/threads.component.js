import React, { Component } from "react";
import PropTypes from "prop-types";
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
    this.threads = this.state.current_threads;
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      ...this.state,
      query: event.target.value,
      current_threads: this.threads.filter(
        thread =>
          thread.text.includes(event.target.value) ||
          thread.title.includes(event.target.value)
      )
    });
    return
  }

  isEditorToggledStyles() {
    return this.props.isEditorToggled ? { display: "none" } : { flex: "1" };
  }

  render() {
    return (
      <div style={{ ...divStyle, ...this.isEditorToggledStyles() }}>
        <Search
          query={this.state.query}
          onQueryChangeHandler={this.onQueryChange}
        />
        <ThreadList threads={this.state.current_threads} />
      </div>
    );
  }
}

ThreadColumn.propTypes = {
  isEditorToggled: PropTypes.bool.isRequired
};

export default ThreadColumn;
