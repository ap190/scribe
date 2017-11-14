import React from "react";
import PropTypes from "prop-types";

const Channel = props => (
  <div
    className="channel-list-item"
    onClick={() => props.selectChannel(props.id)}
  >
    <div className="channel-list-item-title">{props.channelName}</div>
    <div className="channel-list-item-last-post">{props.lastPosted}</div>
  </div>
);

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastPosted: PropTypes.string.isRequired,
  selectChannel: PropTypes.func.isRequired
};

export default Channel;
