import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import Modal from "../common/Modal";
import ThreadColumn from "./ThreadColumn";
import Aside from "./AsideColumn";
import EditorColumn from "./EditorColumn";
import ChannelModal from "../common/Modal/channelModal.component";
import ThreadModal from "../common/Modal/threadModal.component";
import { createFileStructure } from "../../utils/createFileTree";
import {
  ASIDE_CREATE_CHANNEL_MODAL,
  HIGHLIGHT_THREAD_MODAL,
  PURPLE_HIGHLIGHT
} from "../../utils/const";
import data from "../../data/channelData";
import fileData from "../../data/fileData";

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
      channelsInRAM: null, // TODO
      fileDataInRAM: null, // TODO
      currentChannel: null,
      currentThreads: null,
      activeNode: null
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.selectChannelOrFile = this.selectChannelOrFile.bind(this);
    this.getUpdatedChannelsState = this.getUpdatedChannelsState.bind(this);
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

  getUpdatedChannelsState(channelsWithOldState, channelId) {
    let currentChannel;
    let threads;
    const channels = channelsWithOldState.map(channel => {
      if (channel.id === channelId && !channel.selected) {
        currentChannel = channel;
        threads = currentChannel.threads;
        channel.selected = !channel.selected;
        return channel;
      }
      channel.selected = false;
      return channel;
    });
    return {
      channels,
      currentChannel,
      threads
    };
  }

  getUpdatedChannelAndThreadsIfSelectionIsFile(activeFile, threads) {
    const currentFile = this.state.fileData.find(
      file => activeFile.module === file.module
    );

    // currentFile has threads
    if (currentFile) {
      threads = currentFile.threads;
    } else {
      // currentFile has no threads yet
      threads = null;
    }
    return {
      activeFile,
      threads
    };
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

  toggleModal(modalType, modalStateObject) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentModal: modalType,
      ...modalStateObject
    });
    return this.getModalContent();
  }

  selectChannelOrFile(channelId, activeFile) {
    let { channels, currentChannel, threads } = this.getUpdatedChannelsState(
      this.state.channels,
      channelId
    );

    if (activeFile) {
      const updateChannelIsFileData = this.getUpdatedChannelAndThreadsIfSelectionIsFile(
        activeFile,
        threads
      );
      currentChannel = updateChannelIsFileData.activeFile;
      threads = updateChannelIsFileData.threads;
    }

    this.setState({
      channels,
      currentChannel,
      activeNode: activeFile,
      currentThreads: threads
    });
  }

  selectFile(file) {
    this.selectChannelOrFile(null, file);
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
          isModalOpen={this.state.isModalOpen}
          selectChannelOrFile={this.selectChannelOrFile}
          selectFile={this.selectFile}
        />
        <ThreadColumn
          ref="threadColumn"
          currentChannel={this.state.currentChannel}
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
