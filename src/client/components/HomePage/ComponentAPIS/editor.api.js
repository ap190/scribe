import { EditorState, Modifier, convertFromRaw } from "draft-js";
import { Block } from "../EditorColumn/Editor/util/constants";
import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";
import "prism-languages";

const prismDecorator = new PrismDecorator({
  defaultSyntax: "python",
  prism: Prism
});

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

export const createEditorState = editorContent => {
  console.log("herereeeee !");
  // return editorContent
  //   ? EditorState.createWithContent(convertFromRaw(editorContent))
  //   : EditorState.createEmpty();
  const contentState = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        type: "header-one",
        text: "Demo for draft-js-prism"
      },
      {
        type: "unstyled",
        text: "Type some JavaScript below:"
      },
      {
        type: "code-block",
        text: "def match_ends(words): return words"
      }
    ]
  });

  return EditorState.createWithContent(contentState, prismDecorator);
};

export const handleAddPastedImg = (currentEditorState, img) =>
  addNewBlock(currentEditorState, Block.IMAGE, {
    src: `file:///${img}`
  });
