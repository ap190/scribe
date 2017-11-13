import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import ChannelList from "../ChannelList/channelList.component";
import "../aside.css";

const addChannelIcon = "./assets/icons/add_channel.png";

const Channels = props => (
  <div className="channels">
    <div className="channelsTitleContainer">
      <Header title={props.title} />
      <img
        className="add-channel-icon"
        src={addChannelIcon}
        alt="Add a channel button"
        onClick={props.handleAddChannel}
      />
    </div>
    <ChannelList channels={props.channels} />
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  handleAddChannel: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired
};

export default Channels;
