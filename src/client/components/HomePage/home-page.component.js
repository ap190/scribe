import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import Modal from "../Modal/modal.component";
import ThreadColumn from "../ThreadColumn/Threads/threads.component";
import Aside from "../AsideColumn/aside.component";
import EditorColumn from "../EditorColumn/editor.component";
import ChannelModal from "../Modal/channelModal.component";
import ThreadModal from "../Modal/threadModal.component";
import { createFileStructure } from "../../utils/createFileTree";
import {
  ASIDE_CREATE_CHANNEL_MODAL,
  HIGHLIGHT_THREAD_MODAL
} from "../../utils/const";
import data from "./channelData";

const electron = window.require("electron");
const remote = electron.remote;
const currentWindow = remote.getCurrentWindow();
const mainProcessFileHandling = remote.require("./server/fileHandler");
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorToggled: false,
      relativePath: "",
      absolutePath: "",
      files: {},
      isModalOpen: false,
      currentModal: "",
      channels: data.channels,
      currentChannel: null
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handleChangeThreadColor = this.handleChangeThreadColor.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.selectChannel = this.selectChannel.bind(this);
    this.currentWindow = currentWindow;
  }

  getModalContent() {
    switch (this.state.currentModal) {
      case ASIDE_CREATE_CHANNEL_MODAL:
        return (
          <ChannelModal
            handleAddChannel={this.handleAddChannel}
            handleOnClose={this.toggleModal}
          />
        );
      case HIGHLIGHT_THREAD_MODAL:
        return (
          <ThreadModal
            handleChangeThreadColor={this.handleChangeThreadColor}
            currentHighlight={this.state.threadColor}
            threadId={this.state.threadId}
            handleOnClose={this.toggleModal}
          />
        );
      default:
        return null;
    }
  }

  toggleModal(modalType, modalStateObject) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentModal: modalType,
      ...modalStateObject
    });
    return this.getModalContent();
  }

  selectProjectDir() {
    const { getDirSelectionFromUser } = mainProcessFileHandling;
    const {
      fileStructure,
      relativePath,
      absolutePath
    } = getDirSelectionFromUser(this.currentWindow);
    if (!fileStructure || fileStructure.length < 1) {
      return;
    }
    const structureObject = createFileStructure(
      fileStructure,
      relativePath[relativePath.length - 1]
    );
    this.setState({
      files: structureObject,
      absolutePath,
      relativePath
    });
  }

  selectChannel(channelId) {
    let { channels } = this.state;
    let currentChannel;
    channels = channels.map(channel => {
      if (channel.id === channelId && !channel.selected) {
        currentChannel = channel;
        console.log(currentChannel);
        channel.selected = !channel.selected;
        this.setState({ channels, currentChannel });
        return channel;
      }
      channel.selected = false;
      this.setState({ channels, currentChannel });
      return channel;
    });
  }

  handleAddChannel(newChannel) {
    this.setState({
      isModalOpen: false,
      channels: [...this.state.channels, newChannel]
    });
  }

  handleChangeThreadColor(threadObj) {
    this.refs.threadColumn.changeThreadColor(
      threadObj.threadId,
      threadObj.threadColor
    );
    this.setState({
      isModalOpen: false
    });
  }

  toggleEditor() {
    this.setState({
      ...this.state,
      isEditorToggled: !this.state.isEditorToggled
    });
  }

  render() {
    return (
      <Wrapper>
        <Modal show={this.state.isModalOpen}>{this.getModalContent()}</Modal>
        <Aside
          isEditorToggled={this.state.isEditorToggled}
          selectProjectDir={this.selectProjectDir}
          tree={this.state.files}
          toggleModal={this.toggleModal}
          channels={this.state.channels}
          selectChannel={this.selectChannel}
        />
        <ThreadColumn
          ref="threadColumn"
          isEditorToggled={this.state.isEditorToggled}
          toggleModal={this.toggleModal}
          handleAddThread={this.openModal}
          isModalOpen={this.state.isModalOpen}
          threads={
            this.state.currentChannel && this.state.currentChannel.threads
          }
        />
        <EditorColumn
          isEditorToggled={this.state.isEditorToggled}
          toggleHandler={this.toggleEditor}
          isModalOpen={this.state.isModalOpen}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
