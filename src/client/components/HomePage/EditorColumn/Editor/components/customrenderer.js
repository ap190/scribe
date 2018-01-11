import QuoteCaptionBlock from "./blocks/blockquotecaption";
import CaptionBlock from "./blocks/caption";
import AtomicBlock from "./blocks/atomic";
import TodoBlock from "./blocks/todo";
import ImageBlock from "./blocks/image";
import { Block } from "../util/constants";
import AtomicEmbedComponent from "./blocks/atomic-embed.component";
import AtomicSeparatorComponent from "./blocks/atomic-seperator.component";
import { CodeBlock } from "../index";

export default (setEditorState, getEditorState) => contentBlock => {
  const type = contentBlock.getType();
  switch (type) {
    case Block.ATOMIC:
      return {
        component: AtomicBlock,
        editable: false,
        props: {
          components: {
            embed: AtomicEmbedComponent,
            separator: AtomicSeparatorComponent
          },
          getEditorState,
          editorState: getEditorState().getCurrentContent()
        }
      };
    case Block.BLOCKQUOTE_CAPTION:
      return { component: QuoteCaptionBlock };
    case Block.CAPTION:
      return { component: CaptionBlock };
    case Block.TODO:
      return {
        component: TodoBlock,
        props: { setEditorState, getEditorState }
      };
    case Block.CODE:
      return {
        component: CodeBlock,
        props: { setEditorState, getEditorState }
      };
    case Block.IMAGE:
      return {
        component: ImageBlock,
        props: { setEditorState, getEditorState }
      };
    case Block.BREAK:
      return { component: AtomicSeparatorComponent, editable: false };
    default:
      return null;
  }
};
