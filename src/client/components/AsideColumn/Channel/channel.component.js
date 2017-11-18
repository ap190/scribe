import React from "react";
import PropTypes from "prop-types";

const Channel = props => (
  <div
    className="channel-list-item"
    onClick={() => props.selectChannelOrFile(props.id)}
    style={props.selected ? { backgroundColor: "#e0e6f6" } : null}
  >
    <div className="channel-list-item-title">{props.channelName}</div>
    <div className="channel-list-item-last-post">{props.lastPosted}</div>
  </div>
);

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastPosted: PropTypes.string.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default Channel;
