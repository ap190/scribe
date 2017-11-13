import React, { Component } from "react";
import PropTypes from "prop-types";
import UUIDv4 from "uuid/v4";

class ChannelModal extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAddChannel({
      channelName: `# ${this.state.value}`,
      lastPosted: "4 days ago",
      id: UUIDv4()
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="ChannelName">
          Channel Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ChannelModal.propTypes = {
  handleAddChannel: PropTypes.func.isRequired
};

export default ChannelModal;
