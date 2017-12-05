import React from "react";
import QuoteCaptionBlock from "./blocks/blockquotecaption";
import CaptionBlock from "./blocks/caption";
import AtomicBlock from "./blocks/atomic";
import TodoBlock from "./blocks/todo";
import ImageBlock from "./blocks/image";
import { Block } from "../util/constants";

// import BreakBlock from "./blocks/break";

const BreakBlock = () => <div> LOL </div>;

export default (setEditorState, getEditorState) => contentBlock => {
  // console.log(editorState, onChange);
  const type = contentBlock.getType();
  switch (type) {
    case Block.BLOCKQUOTE_CAPTION:
      return {
        component: QuoteCaptionBlock
      };
    case Block.CAPTION:
      return {
        component: CaptionBlock
      };
    case Block.ATOMIC:
      return {
        component: AtomicBlock,
        editable: false,
        props: {
          getEditorState
        }
      };
    case Block.TODO:
      return {
        component: TodoBlock,
        props: {
          setEditorState,
          getEditorState
        }
      };
    case Block.IMAGE:
      return {
        component: ImageBlock,
        props: {
          setEditorState,
          getEditorState
        }
      };
    case Block.BREAK:
      return {
        component: BreakBlock,
        editable: false
      };
    default:
      return null;
  }
};