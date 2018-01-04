import React, { Component } from "react";
import UUIDv4 from "uuid/v4";
import path from "path";
import axios from "axios";
import styled from "styled-components";
import { convertToRaw, EditorState, AtomicBlockUtils } from "draft-js";
import SplitPane from "react-split-pane";
import moment from "moment";
import "react-contexify/dist/ReactContexify.min.css";
import Modal from "../common/Modal";
import Loading from "../common/Loading";
import ThreadColumn from "./ThreadColumn";
import Aside from "./AsideColumn";
import EditorColumn from "./EditorColumn";
import {
  addNewBlock,
  handleAddText,
  handleAddPastedImg,
  createEditorState
} from "./ComponentAPIS/editor.api";
import {
  updateCacheIfNew,
  fetchIfDocumentExists,
  doesDocumentExist
} from "./ComponentAPIS/unsaved-document-cache.api";
import { saveSingleFile, saveAllFiles } from "./ComponentAPIS/file-storage.api";
import { initIpcRenderer } from "./ComponentAPIS/ipcRenderer.api";
import { handleDeleteChannel } from "./ComponentAPIS/channels.api";
import { getChannelAndThreadIdx } from "./ComponentAPIS/utils.api";
import { Block } from "./EditorColumn/Editor/util/constants";
import ChannelModal from "../common/Modal/channelModal.component";
import EmbedContentModal from "../common/Modal/embedContentModal.component";
import ThreadModal from "../common/Modal/threadModal.component";
import { createFileStructure } from "../../utils/createFileTree";
import { modals, notifications } from "../../utils/const";
import { highlightColor } from "../../themes";
import { setRenderOptions } from "./EditorColumn/Editor/exportToHTML";
import "./home-page.css";

const { GREY_HIGHLIGHT } = highlightColor;
const {
  ASIDE_CREATE_CHANNEL_MODAL,
  HIGHLIGHT_THREAD_MODAL,
  EMBED_CONTENT_MODAL
} = modals;
const electron = window.require("electron");
const remote = electron.remote;
const currentWindow = remote.getCurrentWindow();
const mainProcessFileHandling = remote.require("./local_server/dialogs");
const { ipcRenderer, shell } = electron;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`;

const LoadingWrapper = styled.div`
  display: flex;
  display: justify-content;
  height: 100vh;
  width: 100%
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const SELECTED_THREAD = -1;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditorToggled: false,
      isModalOpen: false,
      showCode: false,
      absolutePath: undefined,
      currentModal: undefined,
      channels: undefined,
      currentThread: undefined,
      currentDocument: undefined,
      wasDocumentEdited: false,
      currentFiles: new Map(),
      unsavedDocCache: new Map(),
      activeNode: undefined,
      userSelectedDir: undefined,
      userData: {
        firstName: undefined,
        lastName: undefined,
        email: undefined
      },
      files: {}
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.selectNextThread = this.selectNextThread.bind(this);
    this.toggleShouldShowCode = this.toggleShouldShowCode.bind(this);
    this.applyThreadChange = this.applyThreadChange.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.selectChannel = this.selectChannel.bind(this);
    this.fetchSelectedFileContent = this.fetchSelectedFileContent.bind(this);
    this.updateEditorOnChannelChange = this.updateEditorOnChannelChange.bind(
      this
    );
    this.getCurrentChannel = this.getCurrentChannel.bind(this);
    this.getCurrentThreads = this.getCurrentThreads.bind(this);
    this.getCurrentThread = this.getCurrentThread.bind(this);
    this.getUpdatedChannelsSelectedState = this.getUpdatedChannelsSelectedState.bind(
      this
    );
    this.selectThread = this.selectThread.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
    this.handleDeleteChannelWrapper = this.handleDeleteChannelWrapper.bind(
      this
    );
    this.handleAddEmbeddedContent = this.handleAddEmbeddedContent.bind(this);
    this.handleAddTextWrapper = this.handleAddTextWrapper.bind(this);
    this.handleAddImageWrapper = this.handleAddImageWrapper.bind(this);
    this.handleAddThread = this.handleAddThread.bind(this);
    this.createNewFileChannel = this.createNewFileChannel.bind(this);
    this.handleChangeThreadColor = this.handleChangeThreadColor.bind(this);
    this.handleDeleteThread = this.handleDeleteThread.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.handleThreadTitleChange = this.handleThreadTitleChange.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.getNumberOfThreads = this.getNumberOfThreads.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.saveWorkspace = this.saveWorkspace.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.exportCurrentDocAsHTML = this.exportCurrentDocAsHTML.bind(this);
    this.launchEditor = this.launchEditor.bind(this);
    this.currentWindow = currentWindow;
  }

  componentDidMount() {
    this.props.location.state &&
      this.setState({ userData: this.props.location.state.userData });

    initIpcRenderer(this);
  }

  launchEditor() {
    if (!this.state.absolutePath) {
      return;
    }
    shell.openItem(this.state.absolutePath);
    // ipcRenderer.send("launch-vs-code", this.state.absolutePath);
  }

  uploadFile(files) {
    let data = new FormData();
    data.append("data", files[0]);
    axios
      .post("https://api.graph.cool/file/v1/cjb6feu9323cp0133gc3vuant", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("file upload response", response);
      })
      .catch(err => console.log(`Err msg is ${err}`));
  }

  getCurrentThread() {
    const threads = this.getCurrentThreads();
    if (!threads) {
      return;
    }
    return threads.filter(thread => thread.selected)[0];
  }

  getCurrentThreads() {
    const channel = this.getCurrentChannel();
    if (!channel) {
      return;
    }
    return channel.threads;
  }

  getCurrentChannel() {
    const { channels } = this.state;
    if (!channels) {
      return;
    }
    return channels.filter(channel => channel.selected)[0];
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

  getUpdatedChannelsSelectedState(channelId) {
    const oldChannels = this.state.channels;
    const newChannels = oldChannels.map(channel => {
      if (channel.id === channelId && !channel.selected) {
        channel.selected = true;
        // Get current document for selected thread.
        this.updateEditorOnChannelChange(channel);
        return channel;
      }
      channel.selected = false;
      return channel;
    });

    this.setState({ channels: newChannels });
  }

  getNumberOfThreads(activeFile) {
    if (!activeFile.relativePath) {
      return 0;
    }
    const relativePath = activeFile.relativePath.join(`/`);
    const absolutePath = `${this.state.absolutePath}/${relativePath}`;
    const currentChannel = this.state.channels.find(
      file => file.channelType === "file" && absolutePath === file.absolutePath
    );

    return currentChannel ? currentChannel.threads.length : 0;
  }

  getUpdatedChannelAndThreadsIfSelectionIsFile(activeFile) {
    const relativePath = activeFile.relativePath.join(`/`);
    const absolutePath = `${this.state.absolutePath}/${relativePath}`;
    const currentChannel = this.state.channels.find(
      file => file.channelType === "file" && absolutePath === file.absolutePath
    );

    return currentChannel;
  }

  selectProjectDir() {
    const { getDirData } = mainProcessFileHandling;
    const { fileStructure, relativePath, absolutePath } = getDirData(
      this.currentWindow
    );
    if (!fileStructure || fileStructure.length < 1) {
      return;
    }
    const structureObject = createFileStructure(
      fileStructure,
      relativePath[relativePath.length - 1]
    );

    this.setState({
      files: structureObject,
      absolutePath
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

  async toggleShouldShowCode() {
    await this.setState({
      showCode: !this.state.showCode
    });
    if (this.state.showCode) {
      const { activeNode, absolutePath } = this.state;
      const fullPath = path.join(absolutePath, ...activeNode.relativePath);
      this.fetchSelectedFileContent(fullPath);
    }
  }

  async selectChannel(channelType, channelId = null, activeFile = null) {
    const { currentDocument, currentThread } = this.state;
    let { unsavedDocCache } = this.state;

    // Update cache with previous doc before switching to new doc
    if (currentDocument && currentThread) {
      unsavedDocCache = updateCacheIfNew(
        currentDocument,
        currentThread,
        unsavedDocCache
      );
    }

    if (channelType === "file") {
      let fileChannel = this.getUpdatedChannelAndThreadsIfSelectionIsFile(
        activeFile
      );
      if (!fileChannel) {
        await this.createNewFileChannel(activeFile);
        fileChannel = this.getCurrentChannel();
      }
      this.getUpdatedChannelsSelectedState(fileChannel.id);
    } else {
      this.getUpdatedChannelsSelectedState(channelId);
    }

    await this.setState({
      activeNode: activeFile,
      showCode: false,
      unsavedDocCache
    });
  }

  async updateEditorOnChannelChange(channel) {
    if (!channel || !channel.threads || channel.threads.length === 0) {
      // TODO: Put a default document.
      return;
    }

    const currentThreadIdx = channel.threads.findIndex(
      thread => thread.selected
    );

    await this.selectThread(
      channel.threads[
        currentThreadIdx === -1
          ? 0 /* If no thread is selected, select the first thread. */
          : currentThreadIdx
      ]
    );
  }

  selectFile(file) {
    this.selectChannel("file", null, file);
  }

  async handleAddChannel(newChannel) {
    const unselectedChannels = this.state.channels.map(channel => {
      channel.selected = false;
      return channel;
    });

    await this.setState({
      isModalOpen: false,
      currentThread: undefined,
      currentDocument: EditorState.createEmpty(),
      channels: [...unselectedChannels, newChannel]
    });
  }

  async handleDeleteChannelWrapper(id = null) {
    if (!id || typeof id !== "string" || !this.state.channels) return;
    const updatedChannels = handleDeleteChannel(id, this.state.channels);
    await this.setState({
      isModalOpen: false,
      currentThread: undefined,
      currentDocument: EditorState.createEmpty(),
      channels: updatedChannels
    });
    return;
  }

  async fetchSelectedFileContent(filePath) {
    ipcRenderer.send("fetch-file", filePath, this.state.currentFiles);
  }

  async handleAddImage(src = null) {
    if (!src || !this.state.currentDocument) return;
    const newEditorState = addNewBlock(
      this.state.currentDocument,
      Block.IMAGE,
      {
        src: `file:///${src}`
      }
    );
    await this.updateDocumentState(newEditorState);
  }

  async handleAddTextWrapper(text = null) {
    if (!text || !this.state.currentDocument) return;
    console.log(`handle add TExt!!`);
    const updatedEditorState = handleAddText(this.state.currentDocument, text);
    await this.updateDocumentState(updatedEditorState);
    new Notification(
      notifications.TEXT_PASTED.title,
      notifications.TEXT_PASTED
    );
  }

  async handleAddImageWrapper(img = null) {
    if (!img || !this.state.currentDocument) return;
    const updateEditorState = handleAddPastedImg(
      this.state.currentDocument,
      img
    );
    await this.updateDocumentState(updateEditorState);
    new Notification(
      notifications.IMAGE_PASTED.title,
      notifications.IMAGE_PASTED
    );
  }

  async handleAddEmbeddedContent(url = null) {
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
    await this.updateDocumentState(newEditorState);
  }

  async updateDocumentState(currentDocument) {
    await this.setState({
      currentDocument,
      wasDocumentEdited: true
    });
  }

  async handleDocumentChange(
    currentDocument,
    channelId = null,
    threadId = null
  ) {
    const { channels } = this.state;
    let currentChannelIdx = null;
    let currentThreadIdx = null;

    const indexObj = getChannelAndThreadIdx(this, channelId, threadId);
    currentChannelIdx = indexObj.currentChannelIdx;
    currentThreadIdx = indexObj.currentThreadIdx;
    if (currentThreadIdx === -1 || currentChannelIdx === -1) {
      this.setState({
        currentThread: undefined,
        currentDocument: EditorState.createEmpty()
      });
      return;
    }

    // TODO: wrong indexes right now!
    console.log(
      "************ i get to setState ************",
      currentChannelIdx,
      currentThreadIdx
    );
    channels[currentChannelIdx].threads[
      currentThreadIdx
    ].document = convertToRaw(currentDocument.getCurrentContent());
    this.setState({ channels });
  }

  async createNewFileChannel(activeFile) {
    const { absolutePath } = this.state;
    const timestamp = moment();
    const relativePath = activeFile.relativePath.join(`/`);
    const newChannel = {
      channelName: `${activeFile.module}`,
      lastPosted: timestamp,
      id: UUIDv4(),
      selected: true,
      channelType: "file",
      threads: [],
      absolutePath: `${absolutePath}/${relativePath}`
    };
    await this.handleAddChannel(newChannel);
  }

  async handleAddThread() {
    const { currentDocument, currentThread } = this.state;
    let { unsavedDocCache } = this.state;

    // Update cache with previous doc before switching to new doc
    if (currentDocument && currentThread) {
      unsavedDocCache = updateCacheIfNew(
        currentDocument,
        currentThread,
        unsavedDocCache
      );
    }

    let { channels, activeNode } = this.state;
    let currentChannel = this.getCurrentChannel();
    if (!currentChannel && activeNode) {
      await this.createNewFileChannel(activeNode);
      currentChannel = this.getCurrentChannel();
      channels = this.state.channels;
    }

    const newThread = {
      text: "New unsaved thread",
      date: "Unsaved",
      title: "Untitled",
      id: UUIDv4(),
      highlightColor: GREY_HIGHLIGHT,
      selected: true,
      document: undefined,
      channelId: currentChannel.id
    };

    const updatedChannels = channels.map(channel => {
      if (currentChannel.id !== channel.id) {
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
      currentThread: newThread,
      currentDocument: newThread.document
    });
  }

  handleDeleteThread(channelId, threadId) {
    const { channels } = this.state;
    const currentChannel = this.getCurrentChannel();
    const currentThreads = this.getCurrentThreads();
    const channelToReplaceIdx = channels.findIndex(
      channel => channel.id === channelId
    );

    currentThreads.splice(threadId, 1);

    if (currentThreads.length === 0 && currentChannel.channelType === "file") {
      channels.splice(channelToReplaceIdx, 1);
    } else {
      currentChannel.threads = currentThreads;
      channels[channelToReplaceIdx] = currentChannel;
    }

    this.setState({
      channels
    });
  }

  async selectThread(thread) {
    const { channels } = this.state;
    let { unsavedDocCache, wasDocumentEdited } = this.state;
    let currentDocument = undefined;
    let currentThread = undefined;
    let newDocTitle = undefined;

    // Update cache with previous doc before switching to new doc
    if (wasDocumentEdited) {
      unsavedDocCache = updateCacheIfNew(
        this.state.currentDocument,
        this.state.currentThread,
        unsavedDocCache
      );
    }

    // Get Channel and Thread index
    const channelIdx = channels.findIndex(
      channel => channel.id === thread.channelId
    );
    const threadIdx = channels[channelIdx].threads.findIndex(
      currentThread => thread.id === currentThread.id
    );

    // Thread was just deleted, nothing to update
    if (threadIdx === -1) {
      return;
    }

    // If document exists in cache, then fetch it
    currentDocument = fetchIfDocumentExists(
      channels[channelIdx].threads[threadIdx],
      unsavedDocCache
    );

    // Update thread selection status, if document is not cached read doc from memory
    channels[channelIdx].threads.forEach((currThread, idx) => {
      if (idx === threadIdx) {
        currThread.selected = true;
        currentThread = currThread;
        // Get new Doc title
        const { channelId, id } = currThread;
        newDocTitle = `${channelId}****${id}`;

        // Load Document Content
        if (!currentDocument) {
          currentDocument = currThread.document
            ? createEditorState(currThread.document)
            : createEditorState(null);
        }
        return;
      }
      currThread.selected = false;
    });

    // Doc exists in Cache, that means it is not saved
    wasDocumentEdited = doesDocumentExist(newDocTitle, unsavedDocCache)
      ? true
      : false;

    this.setState({
      channels,
      currentDocument,
      currentThread,
      unsavedDocCache,
      wasDocumentEdited
    });
  }

  applyThreadChange(threadId, threadFunc) {
    const currentThreads = this.getCurrentThreads();
    const currentChannel = this.getCurrentChannel();

    if (!currentThreads || !currentChannel) return null;

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
      channels
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

  selectNextThread() {
    const currentThreads = this.getCurrentThreads();
    if (currentThreads.length <= 1) {
      return;
    }

    let currentThreadIdx = currentThreads.findIndex(thread => thread.selected);

    this.selectThread(
      currentThreads[
        currentThreadIdx + 1 !== currentThreads.length
          ? (currentThreadIdx += 1)
          : 0
      ],
      true
    );
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
    saveAllFiles(this);
  }

  saveFile() {
    console.log("here!!!");
    const timestamp = moment();
    const oldChannels = this.state.channels;
    const newChannels = oldChannels.map(channel => {
      if (channel.selected) {
        channel.lastPosted = timestamp;
        return channel;
      }
      return channel;
    });

    saveSingleFile(this);
    this.setState({ channels: newChannels });
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
    if (!this.state.channels) {
      return (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      );
    }
    return (
      <Wrapper>
        <Modal show={this.state.isModalOpen}>{this.getModalContent()}</Modal>
        <SplitPane
          split="vertical"
          size={this.state.isEditorToggled ? "0%" : "22%"}
          allowResize={this.state.isEditorToggled ? false : true}
        >
          <Aside
            isEditorToggled={this.state.isEditorToggled}
            selectProjectDir={this.selectProjectDir}
            tree={this.state.files}
            activeNode={this.state.activeNode}
            toggleModal={this.toggleModal}
            channels={this.state.channels}
            selectChannelOrFile={this.selectChannel}
            selectFile={this.selectFile}
            getNumberOfThreads={this.getNumberOfThreads}
            handleDeleteChannel={this.handleDeleteChannelWrapper}
            firstName={this.state.userData.firstName}
            lastName={this.state.userData.lastName}
            email={this.state.userData.email}
            launchEditor={this.launchEditor}
          />
          <SplitPane
            split="vertical"
            size={this.state.isEditorToggled ? "0%" : "35%"}
            allowResize={this.state.isEditorToggled ? false : true}
          >
            <ThreadColumn
              currentFiles={this.state.currentFiles}
              currentChannel={this.getCurrentChannel()}
              isEditorToggled={this.state.isEditorToggled}
              showCode={this.state.showCode}
              toggleModal={this.toggleModal}
              toggleShouldShowCode={this.toggleShouldShowCode}
              isModalOpen={this.state.isModalOpen}
              threads={this.getCurrentThreads()}
              selectThread={this.selectThread}
              handleAddThread={this.handleAddThread}
              handleDeleteThread={this.handleDeleteThread}
              activeNode={this.state.activeNode}
              absolutePath={this.state.absolutePath}
            />
            <EditorColumn
              isEditorToggled={this.state.isEditorToggled}
              toggleEditorHandler={this.toggleEditor}
              nextThreadHandler={this.selectNextThread}
              toggleModal={this.toggleModal}
              isModalOpen={this.state.isModalOpen}
              currentThreads={this.getCurrentThreads()}
              currentDocument={this.state.currentDocument}
              currentThread={this.getCurrentThread()}
              updateDocumentState={this.updateDocumentState}
              handleThreadTitleChange={this.handleThreadTitleChange}
              saveWorkspace={this.saveFile}
              exportCurrentDocAsHTML={this.exportCurrentDocAsHTML}
              handleAddEmbeddedContent={this.handleAddEmbeddedContent}
              wasDocumentEdited={this.state.wasDocumentEdited}
            />
          </SplitPane>
        </SplitPane>
      </Wrapper>
    );
  }
}

HomePage.defaultProps = {
  userData: {
    firstName: "Elon",
    lastName: "Musk",
    email: "spacex@gmail.com"
  }
};

export default HomePage;
