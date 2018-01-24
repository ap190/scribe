import React from "react";
import moment from "moment";
import Moment from "react-moment";
import PropTypes from "prop-types";
import "./channel.css";

import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getTheme = isDark => {
  return {
    color: isDark
      ? darkTheme.aside.channels.channel.color
      : lightTheme.aside.channels.channel.color
  };
};

const getStyling = isDarkTheme => (isDarkTheme ? darkTheme : lightTheme);

const Channel = props => {
  const titleString = `channel ${props.id}`;
  return props.channelType === "communication" ? (
    <div
      id="menu_id"
      className="channel-container"
      title={titleString}
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
          title={titleString}
          onClick={() => props.selectChannelOrFile(props.channelType, props.id)}
          style={getTheme(props.darkTheme)}
        >
          <div className="channel-list-item-title" title={titleString}>
            {props.channelName}
          </div>
          <Moment
            title={titleString}
            className="channel-list-item-last-post"
            fromNow
          >
            {moment(props.lastPosted._d)}
          </Moment>
        </div>
      </div>
    </div>
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
