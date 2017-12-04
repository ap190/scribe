import Editor from "./editor.component";
import beforeInput, { StringToTypeMap } from "./util/beforeinput";
import RenderMap from "./util/rendermap";
import Link, { findLinkEntities } from "./components/entities/link";
import keyBindingFn from "./util/keybinding";
import customRendererFn from "./components/customrenderer";
import customStyleMap from "./util/customstylemap";
import createEditorState from "./model/content";
import QuoteCaptionBlock from "./components/blocks/blockquotecaption";
import CaptionBlock from "./components/blocks/caption";
import AtomicBlock from "./components/blocks/atomic";
import TodoBlock from "./components/blocks/todo";
import ImageBlock from "./components/blocks/image";
import ImageSideButton from "./components/inline-side-buttons/image";
import EmbedSideButton from "./components/inline-side-buttons/embed-side-button";
import SeparatorSideButton from "./components/inline-side-buttons/separator-side-button";
import BreakSideButton from "./components/inline-side-buttons/break";

export { Block, Inline, Entity, HANDLED, NOT_HANDLED } from "./util/constants";
export { BLOCK_BUTTONS, INLINE_BUTTONS } from "./components/toolbar";

export {
  getDefaultBlockData,
  getCurrentBlock,
  addNewBlock,
  resetBlockWithType,
  updateDataOfBlock,
  addNewBlockAt
} from "./model";

export {
  Editor,
  createEditorState,
  StringToTypeMap,
  RenderMap,
  Link,
  findLinkEntities,
  beforeInput,
  customStyleMap,
  keyBindingFn,
  customRendererFn,
  QuoteCaptionBlock,
  CaptionBlock,
  AtomicBlock,
  TodoBlock,
  ImageBlock,
  ImageSideButton,
  SeparatorSideButton,
  EmbedSideButton,
  BreakSideButton
};

export default Editor;
