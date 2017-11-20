import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ColorCircleList from "./ThreadHighlightModal/ColorCircleList/color-circle-list.component";
import { highlightColor } from "../../../themes/colors";

const {
  GREY_HIGHLIGHT,
  RED_HIGHLIGHT,
  BLUE_HIGHLIGHT,
  YELLOW_HIGHLIGHT,
  PURPLE_HIGHLIGHT
} = highlightColor;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
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
    event.preventDefault();
    this.props.handleChangeThreadColor({
      threadId: this.props.threadId,
      threadColor: this.state.currentHighlight
    });
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
            <button className="cancel-btn" onClick={this.props.handleOnClose}>
              Cancel
            </button>
            <button className="accept-btn" type="submit">
              Save Color
            </button>
          </Footer>
        </div>
      </form>
    );
  }
}

ThreadModal.propTypes = {
  threadId: PropTypes.string.isRequired,
  currentHighlight: PropTypes.string.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  handleChangeThreadColor: PropTypes.func.isRequired
};

export default ThreadModal;
