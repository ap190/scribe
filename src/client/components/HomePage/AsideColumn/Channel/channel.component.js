import React from "react";
import PropTypes from "prop-types";
import "./channel.css";

const Channel = props =>
  props.channelType === "communication" ? (
    <div
      className="channel-highlight"
      style={props.selected ? { backgroundColor: "#e0e6f6" } : null}
    >
      <div className="channel-container">
        <div
          className="channel-list-item"
          onClick={() => props.selectChannelOrFile(props.channelType, props.id)}
        >
          <div className="channel-list-item-title">{props.channelName}</div>
          <div className="channel-list-item-last-post">{props.lastPosted}</div>
        </div>
      </div>
    </div>
  ) : null;

Channel.defaultProps = {
  channelName: undefined,
  selected: false
};

Channel.propTypes = {
  channelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  lastPosted: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default Channel;
