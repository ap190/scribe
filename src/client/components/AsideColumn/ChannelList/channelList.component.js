import React from "react";
import PropTypes from "prop-types";
import Channel from "../Channel/channel.component";

const ChannelList = props => (
  <div className="channels-list">
    {props.channels &&
      props.channels.map(channel => (
        <Channel
          channelName={channel.channelName}
          lastPosted={channel.lastPosted}
          key={channel.id}
        />
      ))}
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired
};

export default ChannelList;
