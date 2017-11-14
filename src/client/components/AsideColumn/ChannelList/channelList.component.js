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
          id={channel.id}
          key={channel.id}
          selectChannel={props.selectChannel}
        />
      ))}
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  selectChannel: PropTypes.func.isRequired
};

export default ChannelList;
