import React from "react";
import moment from "moment";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { ContextMenuProvider } from "react-contexify";
import ChannelContextMenu from "../../../common/ChannelContextMenu";
import "react-contexify/dist/ReactContexify.min.css";
import "./channel.css";

import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getStyling = isDarkTheme => (isDarkTheme ? darkTheme : lightTheme);

const Channel = props => {
  return props.channelType === "communication" ? (
    <ContextMenuProvider
      id="menu_id"
      className="channel-container"
      style={
        props.selected
          ? {
              backgroundColor: getStyling(props.darkTheme).aside.contextMenu
                .backgroundColor
            }
          : null
      }
    >
      <div onClick={props.handleDeleteChannel}>
        <div
          className="channel-list-item"
          onClick={() => props.selectChannelOrFile(props.channelType, props.id)}
        >
          <div className="channel-list-item-title">{props.channelName}</div>
          <Moment className="channel-list-item-last-post" fromNow>
            {moment(props.lastPosted._d)}
          </Moment>
        </div>
      </div>
      <ChannelContextMenu
        channelID={props.id}
        handleDeleteChannel={props.handleDeleteChannel}
      />
    </ContextMenuProvider>
  ) : null;
};

Channel.defaultProps = {
  channelName: undefined,
  selected: false
};

Channel.propTypes = {
  channelName: PropTypes.string,
  id: PropTypes.string.isRequired,
  lastPosted: PropTypes.object.isRequired,
  channelType: PropTypes.string.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  handleDeleteChannel: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

Channel.defaultProps = {
  lastPosted: moment()
};

export default Channel;
