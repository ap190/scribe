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
          selectChannelOrFile={props.selectChannelOrFile}
          selected={channel.selected}
        />
      ))}
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired
};

export default ChannelList;
