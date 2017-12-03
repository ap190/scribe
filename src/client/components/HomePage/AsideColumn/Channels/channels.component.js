import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import ChannelList from "../ChannelList";
import "../aside.css";
import { modals } from "../../../../utils/const";

const { ASIDE_CREATE_CHANNEL_MODAL } = modals;
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
    <ChannelList
      channels={props.channels}
      selectChannelOrFile={props.selectChannelOrFile}
    />
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired
};

export default Channels;
