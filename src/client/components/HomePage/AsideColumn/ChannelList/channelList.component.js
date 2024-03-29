import React from "react";
import PropTypes from "prop-types";
import Channel from "../Channel";
import "./channelList.css";

const ChannelList = props => {
  return (
    <div className="channels-container">
      <div className="channels-list">
        {props.channels &&
          props.channels.map(channel => (
            <Channel
              channelName={channel.channelName}
              lastPosted={channel.lastPosted}
              channelType={channel.channelType}
              id={channel.id}
              key={channel.id}
              selectChannelOrFile={props.selectChannelOrFile}
              selected={channel.selected}
              handleDeleteChannel={props.handleDeleteChannel}
              darkTheme={props.darkTheme}
            />
          ))}
      </div>
    </div>
  );
};

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  handleDeleteChannel: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool
};

export default ChannelList;
