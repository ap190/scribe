import MediumDraftEditor from "./editor.component";
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
import ImageSideButton from "./components/inline-side-buttons/image-side-button";
import EmbedSideButton from "./components/inline-side-buttons/embed-side-button";
import SeparatorSideButton from "./components/inline-side-buttons/separator-side-button";
import CodeBlockSideButton from "./components/inline-side-buttons/code-block-side-button";

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
  MediumDraftEditor,
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
  CodeBlockSideButton
};

export default MediumDraftEditor;
