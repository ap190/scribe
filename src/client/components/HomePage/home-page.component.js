import React, { Component } from "react";
import styled from "styled-components";
import UUIDv4 from "uuid/v4";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import Modal from "../Modal/modal.component";
import ThreadColumn from "../ThreadColumn/Threads/threads.component";
import Aside from "../AsideColumn/aside.component";
import Editor from "../EditorColumn/editor.component";
import ChannelModal from "../Modal/channelModal.component";
import ThreadModal from "../Modal/threadModal.component";
import { createFileStructure } from "../../utils/createFileTree";
import {
  ASIDE_CREATE_CHANNEL_MODAL,
  HIGHLIGHT_THREAD_MODAL
} from "../../utils/const";

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
      channels: [
        {
          channelName: "# design stuff",
          lastPosted: "4 days ago",
          id: UUIDv4(),
          selected: false
        },
        {
          channelName: "# backend",
          lastPosted: "21 minutes ago",
          id: UUIDv4(),
          selected: false
        },
        {
          channelName: "# business clients",
          lastPosted: "1 day ago",
          id: UUIDv4(),
          selected: false
        }
      ]
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
    channels = channels.map(channel => {
      if (channel.id === channelId && !channel.selected) {
        channel.selected = true;
        return channel;
      } else if (channel.id === channelId && channel.selected) {
        channel.selected = false;
        return channel;
      }
      channel.selected = false;
      return channel;
    });
    this.setState({ channels });
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
        />
        <Editor
          isEditorToggled={this.state.isEditorToggled}
          toggleHandler={this.toggleEditor}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
