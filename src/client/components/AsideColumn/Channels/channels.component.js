import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import ChannelList from "../ChannelList/channelList.component";
import { ASIDE_CREATE_CHANNEL_MODAL } from "../../../utils/const";
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
        onClick={() => props.toggleModal(ASIDE_CREATE_CHANNEL_MODAL)}
      />
    </div>
    <ChannelList channels={props.channels} />
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired
};

export default Channels;
