import React from "react";
import PropTypes from "prop-types";

const Channel = props => (
  <div className="channel-list-item">
    <div className="channel-list-item-title">{props.channelName}</div>
    <div className="channel-list-item-last-post">{props.lastPosted}</div>
  </div>
);

Channel.propTypes = {
  channelName: PropTypes.string.isRequired,
  lastPosted: PropTypes.string.isRequired
};

export default Channel;
