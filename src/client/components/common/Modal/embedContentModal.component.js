import React, { Component } from "react";
import PropTypes from "prop-types";
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
    this.props.handleAddEmbeddedContent(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="modal">
          <div className="modal-header">Embed Content From a URL</div>
          <div>
            <label htmlFor="EmbeddedURL" />
            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Paste a URL to embed content..."
            />
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={this.props.handleOnClose}>
              Cancel
            </button>
            <button className="accept-btn" type="submit">
              Embed
            </button>
          </div>
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
