import React, { Component } from "react";
import PropTypes from "prop-types";
import UUIDv4 from "uuid/v4";
import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Input = styled.input`
  display: flex;
  min-width: 240px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  outline: none;
  font-size: 16px;
  line-height: 22px;
  padding: 6px 12px 6px 12px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const modalHeader = {
  fontFamily: "AvenirNext-Bold",
  fontSize: "-webkit-xxx-large"
};

const modalStyle = {
  backgroundColor: "#fff",
  borderRadius: 5,
  maxWidth: 500,
  minHeight: 300,
  margin: "0 auto",
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center"
};

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
        <div className="modal" style={modalStyle}>
          <div style={modalHeader}>Create a Channel</div>
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Enter channel name..."
          />
          <Footer>
            <button className="accept-btn" type="submit">
              Create Channel
            </button>
            <button className="cancel-btn" onClick={this.props.handleOnClose}>
              Cancel
            </button>
          </Footer>
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
