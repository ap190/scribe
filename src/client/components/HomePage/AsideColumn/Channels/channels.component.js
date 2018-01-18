import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import ChannelList from "../ChannelList";
import "../aside.css";
import { modals } from "../../../../utils/const";
import lightTheme from "../../../../themes/light-theme";
import darkTheme from "../../../../themes/dark-theme";

const getTheme = isDark =>
  isDark ? darkTheme.icons.circleAdd : lightTheme.icons.circleAdd;

const { ASIDE_CREATE_CHANNEL_MODAL } = modals;

const Channels = props => (
  <div className="channels">
    <Header
      title={props.title}
      handler={props.toggleModal}
      alternativeText="Add a channel button"
      source={getTheme(props.darkTheme)}
      modalType={ASIDE_CREATE_CHANNEL_MODAL}
      darkTheme={props.darkTheme}
    />
    <ChannelList
      channels={props.channels}
      selectChannelOrFile={props.selectChannelOrFile}
      handleDeleteChannel={props.handleDeleteChannel}
      darkTheme={props.darkTheme}
    />
  </div>
);

Channels.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  selectChannelOrFile: PropTypes.func.isRequired,
  handleDeleteChannel: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool
};

export default Channels;
