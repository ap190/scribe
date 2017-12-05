import React, { Component } from "react";
import PropTypes from "prop-types";
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
  border: 1px solid black;
  outline: none;
  font-size: 16px;
  line-height: 22px;
  padding: 6px 12px 6px 12px;
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

class EmbedContentModal extends Component {
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
    this.props.handleOnClose();
    console.log("EMBEDED CONTENT MODAL", this.state.value);
    this.props.handleAddEmbeddedContent(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="modal" style={modalStyle}>
          <div style={modalHeader}>Enter a URL</div>
          <div>
            <label htmlFor="ChannelName">URL Name</label>
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Paste a URL to embed content..."
            />
          </div>
          <Footer>
            <button className="accept-btn" type="submit">
              Embed Content
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

EmbedContentModal.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  handleAddEmbeddedContent: PropTypes.func.isRequired
};

export default EmbedContentModal;
