import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
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
  HIGHLIGHT_THREAD_MODAL,
  PURPLE_HIGHLIGHT
} from "../../utils/const";
import data from "./channelData";
import fileData from "./fileData";

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
      fileData: fileData.files,
      currentChannel: null,
      currentThreads: null,
      activeNode: null
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.selectChannel = this.selectChannel.bind(this);
    this.selectThread = this.selectThread.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handleAddThread = this.handleAddThread.bind(this);
    this.handleChangeThreadColor = this.handleChangeThreadColor.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.selectFile = this.selectFile.bind(this);
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

  selectChannel(channelId, activeFile) {
    let { channels } = this.state;
    let currentChannel;
    let threads;
    channels = channels.map(channel => {
      if (channel.id === channelId && !channel.selected) {
        currentChannel = channel;
        channel.selected = !channel.selected;
        return channel;
      }
      channel.selected = false;
      return channel;
    });

    // Selected "Channel" is file
    if (activeFile) {
      currentChannel = activeFile;
      const currentFile = this.state.fileData.find(
        file => currentChannel.module === file.module
      );

      // currentFile has threads
      if (currentFile) {
        threads = currentFile.threads;
      } else {
        // currentFile has no threads yet
        threads = null;
      }
    } else {
      // this is a channel
      threads = currentChannel.threads;
    }

    this.setState({
      channels,
      currentChannel,
      activeNode: activeFile,
      currentThreads: threads
    });
  }

  selectFile(file) {
    this.selectChannel(null, file);
  }

  handleAddChannel(newChannel) {
    this.setState({
      isModalOpen: false,
      channels: [...this.state.channels, newChannel]
    });
  }

  // TODO split to 2  methods - addThread for Channel, add For File
  handleAddThread() {
    const { currentChannel } = this.state;
    const channels = this.state.channels;
    const updatedChannels = channels.map(channel => {
      if (currentChannel.id !== channel.id) {
        return channel;
      }
      channel.threads.push({
        text: "hey there~!",
        title: "giraffe",
        date: Date.now(),
        id: UUIDv4(),
        highlightColor: PURPLE_HIGHLIGHT,
        selected: false,
        channelName: "# design stuff"
      });
      return channel;
    });
    this.setState({ channels: updatedChannels });
  }

  selectThread(thread) {
    const { channels } = this.state;
    const channelIdx = channels.findIndex(
      channel => channel.channelName === thread.channelName
    );
    const threadIdx = channels[channelIdx].threads.findIndex(
      currentThread => thread.id === currentThread.id
    );
    channels[channelIdx].threads[threadIdx].selected = !channels[channelIdx]
      .threads[threadIdx].selected;
    channels[channelIdx].threads.forEach((currThread, idx) => {
      if (idx === threadIdx) {
        return;
      }
      currThread.selected = false;
    });
    this.setState({ channels });
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
          activeNode={this.state.activeNode}
          toggleModal={this.toggleModal}
          channels={this.state.channels}
          selectChannel={this.selectChannel}
          selectFile={this.selectFile}
        />
        <ThreadColumn
          ref="threadColumn"
          isEditorToggled={this.state.isEditorToggled}
          toggleModal={this.toggleModal}
          isModalOpen={this.state.isModalOpen}
          threads={this.state.currentThreads}
          selectThread={this.selectThread}
          handleAddThread={this.handleAddThread}
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
