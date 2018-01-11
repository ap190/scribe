import React, { Component } from "react";
import PropTypes from "prop-types";
import UUIDv4 from "uuid/v4";
import moment from "moment";
import styled from "styled-components";

const Input = styled.input`
  display: flex;
  min-width: 240px;
  background: #ffffff;
  border: 1px solid #979797;
  outline: none;
  line-height: 36px;
  width: 45vh;
  padding: 6px 12px 6px 12px;
  font-family: AvenirNext-Regular;
  font-size: 18px;
  color: #a3a3a3;
  letter-spacing: 0.61px;
  &:focus {
    outline: none;
  }
`;

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
    const timestamp = moment(new Date().toUTCString());
    this.props.handleAddChannel({
      channelName: `# ${this.state.value}`,
      id: UUIDv4(),
      selected: true,
      channelType: "communication",
      threads: []
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="modal">
          <div className="modal-header">Create a Notebook</div>
          <div>
            <label htmlFor="ChannelName" />
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Enter notebook name..."
            />
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={this.props.handleOnClose}>
              Cancel
            </button>
            <button className="accept-btn" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ChannelModal.propTypes = {
  handleAddChannel: PropTypes.func.isRequired,
  handleOnClose: PropTypes.func.isRequired
};

export default ChannelModal;
