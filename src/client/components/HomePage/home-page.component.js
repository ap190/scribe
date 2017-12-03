import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
import styled from "styled-components";
import { compose } from "recompose";
import { convertFromRaw, EditorState } from "draft-js";
import moment from "moment";
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
  HIGHLIGHT_THREAD_MODAL
} from "../../utils/const";
import { highlightColor } from "../../themes";

const { PURPLE_HIGHLIGHT } = highlightColor;
const electron = window.require("electron");
const remote = electron.remote;
const currentWindow = remote.getCurrentWindow();
const mainProcessFileHandling = remote.require("./server/fileHandler");
const ipcRenderer = electron.ipcRenderer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const SELECTED_THREAD = -1;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorToggled: false,
      isModalOpen: false,
      relativePath: undefined,
      absolutePath: undefined,
      currentModal: undefined,
      channels: undefined,
      currentChannel: undefined,
      currentThreads: undefined,
      currentDocument: undefined,
      currentTitle: undefined,
      savedTime: undefined,
      activeNode: undefined,
      files: {}
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.applyThreadChange = this.applyThreadChange.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.selectChannelOrFile = this.selectChannelOrFile.bind(this);
    this.getUpdatedChannelsSelectedState = this.getUpdatedChannelsSelectedState.bind(
      this
    );
    this.selectThread = this.selectThread.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handleAddThread = this.handleAddThread.bind(this);
    this.handleChangeThreadColor = this.handleChangeThreadColor.bind(this);
    this.handleDeleteThread = this.handleDeleteThread.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.handleThreadTitleChange = this.handleThreadTitleChange.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.saveWorkspace = this.saveWorkspace.bind(this);
    this.currentWindow = currentWindow;
  }

  componentDidMount() {
    ipcRenderer.send("load-file-req");

    ipcRenderer.on("load-file-res", (event, channels) => {
      this.setState({
        channels
      });
    });

    ipcRenderer.on("save-workspace-res", () =>
      console.log("saved successfullyy...")
    );
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

  getUpdatedChannelsSelectedState(channelsWithOldState, channelId) {
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
    const currentChannel = this.state.channels.find(
      file => file.channelType === "file" && activeFile.module === file.module
    );

    // currentFile has threads
    if (currentChannel) {
      threads = currentChannel.threads;
    } else {
      // currentFile has no threads yet
      threads = null;
    }
    return {
      currentChannel,
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

  selectChannelOrFile(channelType, channelId = null, activeFile = null) {
    let {
      channels,
      currentChannel,
      threads
    } = this.getUpdatedChannelsSelectedState(this.state.channels, channelId);

    if (channelType === "file") {
      const updateChannelIsFileData = this.getUpdatedChannelAndThreadsIfSelectionIsFile(
        activeFile,
        threads
      );
      currentChannel = updateChannelIsFileData.currentChannel;
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
    this.selectChannelOrFile("file", null, file);
  }

  handleAddChannel(newChannel) {
    this.setState({
      isModalOpen: false,
      channels: [...this.state.channels, newChannel]
    });
  }

  handleAddThread() {
    const { currentChannel, channels } = this.state;
    if (!currentChannel) {
      return;
    }
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

  handleDeleteThread(channelName, threadId) {
    const { channels } = this.state;
    const currentChannel = channels.find(
      channel => channel.channelName === channelName
    );
    const currentThreads = currentChannel.threads.filter(
      thread => thread.id !== threadId
    );
    const channelToReplaceIdx = channels.findIndex(
      channel => channel.channelName === channelName
    );
    currentChannel.threads = currentThreads;
    channels[channelToReplaceIdx] = currentChannel;
    this.setState({
      channels,
      currentChannel,
      currentThreads
    });
  }

  selectThread(thread) {
    const { channels } = this.state;
    let currentDocument;
    let currentTitle;
    let savedTime;
    const channelIdx = channels.findIndex(
      channel => channel.channelName === thread.channelName
    );
    const threadIdx = channels[channelIdx].threads.findIndex(
      currentThread => thread.id === currentThread.id
    );

    // was just deleted
    if (threadIdx === -1) {
      return;
    }

    channels[channelIdx].threads.forEach((currThread, idx) => {
      if (idx === threadIdx) {
        currThread.selected = !currThread.selected;
        currentDocument = currThread.document
          ? EditorState.createWithContent(convertFromRaw(currThread.document))
          : EditorState.createEmpty();
        currentTitle = currThread.title;
        savedTime = currThread.date;
        return;
      }
      currThread.selected = false;
    });
    this.setState({ channels, currentDocument, currentTitle, savedTime });
  }

  applyThreadChange(threadId, threadFunc) {
    const { currentChannel, currentThreads } = this.state;

    // create new threads
    const newThreads = currentThreads.map(thread => {
      if (
        thread.id === threadId ||
        (threadId === SELECTED_THREAD && thread.selected)
      ) {
        return threadFunc(thread);
      }
      return thread;
    });

    // update channels with new threads
    const channels = this.state.channels.map(channel => {
      if (channel.id === currentChannel.id) {
        channel.threads = newThreads;
        return channel;
      }
      return channel;
    });

    this.setState({
      channels,
      currentThreads: newThreads
    });
  }

  handleChangeThreadColor(threadObj) {
    const { threadId, threadColor } = threadObj;

    this.applyThreadChange(threadId, thread => {
      return {
        ...thread,
        highlightColor: threadColor
      };
    });

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

  handleDocumentChange(currentDocument, contentRaw) {
    const { channels, currentChannel, currentThreads } = this.state;
    if (!currentChannel || !currentThreads || !channels) return;
    const currentChannelIdx = channels.findIndex(
      channel => channel.channelName === currentChannel.channelName
    );
    const currentThreadIdx = currentThreads.findIndex(
      thread => thread.selected
    );

    currentChannel.threads[currentThreadIdx].document = JSON.stringify(
      currentDocument
    );
    currentThreads[currentThreadIdx].document = JSON.stringify(currentDocument);
    channels[currentChannelIdx].threads[currentThreadIdx].document = contentRaw;
    this.setState({
      channels,
      currentDocument,
      currentThreads
    });
  }

  handleThreadTitleChange(threadTitle) {
    this.applyThreadChange(SELECTED_THREAD, thread => {
      return {
        ...thread,
        title: threadTitle
      };
    });

    this.setState({
      currentTitle: threadTitle
    });
  }

  saveWorkspace() {
    // Get time of save.
    const timestamp = moment().format("LLLL");

    this.applyThreadChange(SELECTED_THREAD, thread => {
      return {
        ...thread,
        date: timestamp,
        text: thread.document.blocks[0].text
      };
    });

    this.setState({
      updateTime: timestamp
    });

    ipcRenderer.send("save-workspace", this.state.channels);
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
          currentChannel={this.state.currentChannel}
          isEditorToggled={this.state.isEditorToggled}
          toggleModal={this.toggleModal}
          isModalOpen={this.state.isModalOpen}
          threads={this.state.currentThreads}
          selectThread={this.selectThread}
          handleAddThread={this.handleAddThread}
          handleDeleteThread={this.handleDeleteThread}
        />
        <EditorColumn
          isEditorToggled={this.state.isEditorToggled}
          toggleHandler={this.toggleEditor}
          isModalOpen={this.state.isModalOpen}
          currentDocument={this.state.currentDocument}
          currentTitle={this.state.currentTitle}
          updateTime={this.state.updateTime}
          handleDocumentChange={this.handleDocumentChange}
          handleThreadTitleChange={this.handleThreadTitleChange}
          saveWorkspace={this.saveWorkspace}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
