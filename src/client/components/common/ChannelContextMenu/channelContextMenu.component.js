import React from "react";
import PropTypes from "prop-types";
import { ContextMenu, Item, IconFont } from "react-contexify";

const ChannelContextMenu = ({ channelID, handleDeleteChannel }) => (
  <ContextMenu id="menu_id">
    <Item
      leftIcon={<IconFont className="fa fa-trash-o" />}
      onClick={() => handleDeleteChannel(channelID)}
    >
      Delete Channel
    </Item>
  </ContextMenu>
);

ChannelContextMenu.propTypes = {
  channelID: PropTypes.string.isRequired,
  handleDeleteChannel: PropTypes.func.isRequired
};

export default ChannelContextMenu;
