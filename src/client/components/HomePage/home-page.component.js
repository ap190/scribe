import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "recompose";
import HomeContainer from "../../containers/Home";
import Modal from "../Modal/modal.component";
import ThreadColumn from "../ThreadColumn/Threads/threads.component";
import Aside from "../AsideColumn/aside.component";
import Editor from "../EditorColumn/editor.component";

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
      isOpen: false
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.selectProjectDir = this.selectProjectDir.bind(this);
    this.createFileStructure = this.createFileStructure.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.currentWindow = currentWindow;
  }

  getRelativePathAsSplitArray(filePath, relativePath) {
    let pathArray = filePath.split("/");
    const idx = pathArray.findIndex(el => el === relativePath);
    pathArray = pathArray.slice(idx).slice(1);
    return pathArray.filter(
      el => !el.includes(".git") || !el.includes("node_modules")
    );
  }

  findParentIndex(layer, parent) {
    const parentIndex = layer.findIndex(element => element.module === parent);
    if (parentIndex === -1) {
      throw new Error("Could not find parent...");
    }
    return parentIndex;
  }

  generateRelativePathArrAndGetDeepestNestedFile(dirArr, relativePath) {
    const pathArray = dirArr.map(filePath =>
      this.getRelativePathAsSplitArray(filePath, relativePath)
    );

    const longestArrayLen = pathArray.reduce(
      (prev, curr) => (curr.length > prev ? curr.length : prev),
      0
    );

    return {
      pathArray,
      longestArrayLen
    };
  }

  createFileStructure(dirArr, relativePath) {
    const output = {
      module: relativePath,
      children: []
    };
    const {
      pathArray,
      longestArrayLen
    } = this.generateRelativePathArrAndGetDeepestNestedFile(
      dirArr,
      relativePath
    );
    for (let i = 0; i < longestArrayLen; i += 1) {
      pathArray.forEach(arr => {
        // out of bounds
        if (i >= arr.length) return;

        // is file
        if (i === arr.length - 1) {
          const file = {
            leaf: true,
            module: arr[i]
          };
          let layer = output.children;
          for (let j = 0; j < i; j += 1) {
            const parentIndex = this.findParentIndex(layer, arr[j]);
            layer = layer[parentIndex].children;
          }
          layer.push(file);
        }

        // is directory
        const folder = {
          module: arr[i],
          collapsed: true,
          children: []
        };
        let layer = output.children;
        for (let j = 0; j < i; j += 1) {
          const parentIndex = this.findParentIndex(layer, arr[j]);
          layer = layer[parentIndex].children;
        }
        const doesFolderExist = layer.findIndex(
          element => element.module === folder.module
        );
        if (doesFolderExist === -1) layer.push(folder);
      });
    }
    return output;
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
    const structureObject = this.createFileStructure(
      fileStructure,
      relativePath[relativePath.length - 1]
    );
    this.setState({
      files: structureObject,
      absolutePath,
      relativePath
    });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
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
        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          `Here's some content for the modal`
        </Modal>
        <Aside
          isEditorToggled={this.state.isEditorToggled}
          selectProjectDir={this.selectProjectDir}
          tree={this.state.files}
          createChannelHandler={this.toggleModal}
        />
        <ThreadColumn isEditorToggled={this.state.isEditorToggled} />
        <Editor
          isEditorToggled={this.state.isEditorToggled}
          toggleHandler={this.toggleEditor}
        />
      </Wrapper>
    );
  }
}

export default compose(HomeContainer)(HomePage);
