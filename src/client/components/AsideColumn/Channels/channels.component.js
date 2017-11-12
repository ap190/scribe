import React from "react";
import Header from "../Header/header.component";
import "../aside.css";

const addChannelIcon = "./assets/icons/add_channel.png";

const Channels = props => (
  <div className="channels">
    <div className="channelsTitleContainer">
      <Header title="Channels" />
      <img
        className="add-channel-icon"
        src={addChannelIcon}
        alt="Add a channel button"
      />
    </div>
  </div>
);

export default Channels;
