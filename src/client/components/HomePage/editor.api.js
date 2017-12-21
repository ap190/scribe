import { EditorState, Modifier } from "draft-js";
import { Block } from "./EditorColumn/Editor/util/constants";

export const getCurrentBlock = editorState => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};

export const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case Block.TODO:
      return { checked: false };
    default:
      return initialData;
  }
};

export const addNewBlock = (
  editorState,
  newType = Block.UNSTYLED,
  initialData = {}
) => {
  const selectionState = editorState.getSelection();
  if (!selectionState.isCollapsed()) {
    return editorState;
  }
  const contentState = editorState.getCurrentContent();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const currentBlock = getCurrentBlock(editorState);
  if (!currentBlock) {
    return editorState;
  }
  if (currentBlock.getLength() === 0) {
    if (currentBlock.getType() === newType) {
      return editorState;
    }
    const newBlock = currentBlock.merge({
      type: newType,
      data: getDefaultBlockData(newType, initialData)
    });
    const newContentState = contentState.merge({
      blockMap: blockMap.set(key, newBlock),
      selectionAfter: selectionState
    });
    return EditorState.push(editorState, newContentState, "change-block-type");
  }
  return editorState;
};

export const handleAddText = (currentEditorState, text) =>
  EditorState.push(
    currentEditorState,
    Modifier.insertText(
      currentEditorState.getCurrentContent(),
      currentEditorState.getSelection(),
      text
    )
  );

export const handleAddPastedImg = (currentEditorState, img) =>
  addNewBlock(currentEditorState, Block.IMAGE, {
    src: `${img}`
  });
