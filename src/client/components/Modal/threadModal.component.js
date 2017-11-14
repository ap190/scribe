import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ColorCircleList from "./ThreadHighlightModal/ColorCircleList/color-circle-list.component";
import {
  GREY_HIGHLIGHT,
  RED_HIGHLIGHT,
  BLUE_HIGHLIGHT,
  YELLOW_HIGHLIGHT,
  PURPLE_HIGHLIGHT
} from "../../utils/const";

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

class ThreadModal extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", currentHighlight: props.currentHighlight };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }

  handleSelectColor(color) {
    this.setState({ ...this.state, currentHighlight: color });
  }

  handleSubmit(event) {
    console.log("here!");
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ ...this.state, value: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="modal" style={modalStyle}>
          <div style={modalHeader}>Select a Color Label</div>
          <ColorCircleList
            onSelectCircleHandler={this.handleSelectColor}
            currentHighlight={this.state.currentHighlight}
            colors={[
              GREY_HIGHLIGHT,
              RED_HIGHLIGHT,
              YELLOW_HIGHLIGHT,
              BLUE_HIGHLIGHT,
              PURPLE_HIGHLIGHT
            ]}
          />
          <Footer>
            <button className="accept-btn" type="submit">
              Save Color
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

ThreadModal.propTypes = {
  currentHighlight: PropTypes.string.isRequired,
  handleOnClose: PropTypes.func.isRequired
};

export default ThreadModal;
