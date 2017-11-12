import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
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
        onClick={props.createChannelHandler}
      />
    </div>
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  createChannelHandler: PropTypes.func.isRequired
};

export default Channels;
