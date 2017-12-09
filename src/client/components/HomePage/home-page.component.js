import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
import styled from "styled-components";
import { compose } from "recompose";
import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  AtomicBlockUtils
} from "draft-js";
import moment from "moment";
import HomeContainer from "../../containers/Home";
import Modal from "../common/Modal";
import ThreadColumn from "./ThreadColumn";
import Aside from "./AsideColumn";
import EditorColumn from "./EditorColumn";
import ChannelModal from "../common/Modal/channelModal.component";
import EmbedContentModal from "../common/Modal/embedContentModal.component";
import ThreadModal from "../common/Modal/threadModal.component";
import { createFileStructure } from "../../utils/createFileTree";
import { modals, notifications } from "../../utils/const";
import { highlightColor } from "../../themes";
import { setRenderOptions } from "./EditorColumn/Editor/exportToHTML";

const { GREY_HIGHLIGHT } = highlightColor;
const {
  ASIDE_CREATE_CHANNEL_MODAL,
  HIGHLIGHT_THREAD_MODAL,
  EMBED_CONTENT_MODAL
} = modals;
const electron = window.require("electron");
const remote = electron.remote;
const currentWindow = remote.getCurrentWindow();
const mainProcessFileHandling = remote.require("./server/dialogs");
const ipcRenderer = electron.ipcRenderer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
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
      currentThread: undefined,
      currentDocument: undefined,
      activeNode: undefined,
      userSelectedDir: undefined,
      files: {}
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.applyThreadChange = this.applyThreadChange.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.selectChannelOrFile = this.selectChannelOrFile.bind(this);
    this.updateEditorOnChannelChange = this.updateEditorOnChannelChange.bind(
      this
    );
    this.getUpdatedChannelsSelectedState = this.getUpdatedChannelsSelectedState.bind(
      this
    );
    this.selectThread = this.selectThread.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handleAddEmbeddedContent = this.handleAddEmbeddedContent.bind(this);
    this.handleAddThread = this.handleAddThread.bind(this);
    this.createNewFileChannel = this.createNewFileChannel.bind(this);
    this.handleChangeThreadColor = this.handleChangeThreadColor.bind(this);
    this.handleDeleteThread = this.handleDeleteThread.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.handleThreadTitleChange = this.handleThreadTitleChange.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.saveWorkspace = this.saveWorkspace.bind(this);
    this.exportCurrentDocAsHTML = this.exportCurrentDocAsHTML.bind(this);
    this.currentWindow = currentWindow;
  }

  componentDidMount() {
    ipcRenderer.send("load-file-req");

    ipcRenderer.on("load-file-res", (event, channels) => {
      this.setState({
        channels
      });
    });

    ipcRenderer.on("save-workspace-shortcut", () => this.saveWorkspace());

    ipcRenderer.on(
      "save-workspace-res",
      () =>
        new Notification(
          notifications.SAVE_DOCUMENT_RICH.title,
          notifications.SAVE_DOCUMENT_RICH
        )
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
      case EMBED_CONTENT_MODAL:
        return (
          <EmbedContentModal
            handleOnClose={this.toggleModal}
            handleAddEmbeddedContent={this.handleAddEmbeddedContent}
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
    const relativePath = activeFile.relativePath.join(`/`);
    const absolutePath = `${this.state.absolutePath}/${relativePath}`;

    const currentChannel = this.state.channels.find(
      file => file.channelType === "file" && absolutePath === file.absolutePath
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

  toggleModal(modalType, modalStateObject = null) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentModal: modalType,
      ...modalStateObject
    });
    this.getModalContent();
    return modalStateObject;
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

    // Get current document for selected thread.
    this.updateEditorOnChannelChange(currentChannel);

    this.setState({
      channels,
      currentChannel,
      activeNode: activeFile,
      currentThreads: threads
    });
  }

  updateEditorOnChannelChange(channel) {
    if (!channel || !channel.threads || channel.threads.length === 0) {
      // TODO: Put a default document.
      return;
    }

    const currentThreadIdx = channel.threads.findIndex(
      thread => thread.selected
    );

    this.selectThread(
      channel.threads[
        currentThreadIdx === -1
          ? 0 /* If no thread is selected, select the first thread. */
          : currentThreadIdx
      ]
    );
  }

  selectFile(file) {
    this.selectChannelOrFile("file", null, file);
  }

  async handleAddChannel(newChannel) {
    // Unselect all other channels.
    const unselectedChannels = this.state.channels.map(channel => {
      channel.selected = false;
      return channel;
    });

    this.setState({
      isModalOpen: false,
      currentThreads: [],
      currentThread: undefined,
      currentChannel: newChannel,
      currentDocument: EditorState.createEmpty(),
      channels: [...unselectedChannels, newChannel]
    });
  }

  handleAddEmbeddedContent(url = null) {
    if (!url || !this.state.currentDocument) return;
    const { currentDocument } = this.state;
    const contentWithEntity = currentDocument
      .getCurrentContent()
      .createEntity("embed", "IMMUTABLE", {
        url
      });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const updatedEditorState = EditorState.push(
      currentDocument,
      contentWithEntity,
      "create-entity"
    );
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      updatedEditorState,
      entityKey,
      "E"
    );
    this.handleDocumentChange(newEditorState);
  }

  handleDocumentChange(currentDocument) {
    const { channels, currentChannel, currentThreads } = this.state;
    if (!currentChannel || !currentThreads || !channels) return;
    const currentChannelIdx = channels.findIndex(
      channel => channel.id === currentChannel.id
    );
    const currentThreadIdx = currentThreads.findIndex(
      thread => thread.selected
    );
    currentChannel.threads[currentThreadIdx].document = JSON.stringify(
      currentDocument
    );
    currentThreads[currentThreadIdx].document = JSON.stringify(currentDocument);
    channels[currentChannelIdx].threads[
      currentThreadIdx
    ].document = convertToRaw(currentDocument.getCurrentContent());
    this.setState({
      channels,
      currentDocument,
      currentThreads
    });
  }

  async createNewFileChannel() {
    const { activeNode, absolutePath } = this.state;
    const relativePath = activeNode.relativePath.join(`/`);
    const newChannel = {
      channelName: `${activeNode.module}`,
      lastPosted: "4 days ago",
      id: UUIDv4(),
      selected: true,
      channelType: "file",
      threads: [],
      absolutePath: `${absolutePath}/${relativePath}`
    };
    await this.handleAddChannel(newChannel);
  }

  async handleAddThread() {
    let { currentChannel, channels, activeNode } = this.state;
    if (!currentChannel && activeNode) {
      await this.createNewFileChannel();
      currentChannel = this.state.currentChannel;
      channels = this.state.channels;
    } else if (!currentChannel) {
      return;
    }

    const newThread = {
      text: "New unsaved thread",
      date: "Unsaved",
      title: "Untitled",
      id: UUIDv4(),
      highlightColor: GREY_HIGHLIGHT,
      selected: true,
      document: undefined,
      channelId: this.state.currentChannel.id
    };

    const updatedChannels = this.state.channels.map(channel => {
      if (this.state.currentChannel.id !== channel.id) {
        return channel;
      }

      // Unselect threads.
      channel.threads.forEach(thread => {
        thread.selected = false;
      });

      channel.threads.unshift(newThread);
      return channel;
    });
    this.setState({
      channels: updatedChannels,
      currentThreads: this.state.currentChannel.threads,
      currentThread: newThread,
      currentDocument: newThread.document
    });
  }

  handleDeleteThread(channelId, threadId) {
    const { channels } = this.state;
    const currentChannel = channels.find(channel => channel.id === channelId);
    const currentThreads = currentChannel.threads.filter(
      thread => thread.id !== threadId
    );
    const channelToReplaceIdx = channels.findIndex(
      channel => channel.id === channelId
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
    let currentThread;
    const channelIdx = channels.findIndex(
      channel => channel.id === thread.channelId
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
        currThread.selected = true;
        currentDocument = currThread.document
          ? EditorState.createWithContent(convertFromRaw(currThread.document))
          : EditorState.createEmpty();
        currentThread = currThread;
        return;
      }
      currThread.selected = false;
    });
    this.setState({ channels, currentDocument, currentThread });
  }

  applyThreadChange(threadId, threadFunc) {
    const { currentChannel, currentThreads } = this.state;

    // create new threads
    const newThreads = currentThreads.map(thread => {
      if (thread.id === threadId) {
        return threadFunc(thread);
      } else if (threadId === SELECTED_THREAD && thread.selected) {
        const updatedThread = threadFunc(thread);
        this.setState({
          currentThread: updatedThread
        });
        return updatedThread;
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

  handleThreadTitleChange(threadTitle) {
    this.applyThreadChange(SELECTED_THREAD, thread => {
      return {
        ...thread,
        title: threadTitle
      };
    });
  }

  saveWorkspace() {
    const timestamp = moment().format("LLLL");
    this.applyThreadChange(SELECTED_THREAD, thread => {
      return {
        ...thread,
        date: timestamp,
        text: thread.document ? thread.document.blocks[0].text : ""
      };
    });

    ipcRenderer.send(
      "save-workspace",
      this.state.channels,
      this.state.userSelectedDir
    );
  }

  exportCurrentDocAsHTML() {
    const HTML = setRenderOptions()(
      this.state.currentDocument.getCurrentContent()
    );
    ipcRenderer.send(
      "export-current-doc",
      HTML,
      this.state.currentThread.title
    );
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
          toggleEditorHandler={this.toggleEditor}
          toggleModal={this.toggleModal}
          isModalOpen={this.state.isModalOpen}
          currentDocument={this.state.currentDocument}
          currentThread={this.state.currentThread}
          handleDocumentChange={this.handleDocumentChange}
          handleThreadTitleChange={this.handleThreadTitleChange}
          saveWorkspace={this.saveWorkspace}
          exportCurrentDocAsHTML={this.exportCurrentDocAsHTML}
          handleAddEmbeddedContent={this.handleAddEmbeddedContent}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
