import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import ChannelList from "../ChannelList/channelList.component";
import "../aside.css";
import { ASIDE_CREATE_CHANNEL_MODAL } from "../../../utils/const";

const addChannelIcon = "./assets/icons/add_channel.png";

const Channels = props => (
  <div className="channels">
    <Header
      title={props.title}
      handler={props.toggleModal}
      alternativeText="Add a channel button"
      source={addChannelIcon}
      modalType={ASIDE_CREATE_CHANNEL_MODAL}
    />
    <ChannelList channels={props.channels} />
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired
};

export default Channels;
