/*
Block Render Map, according to official docs
https://draftjs.org/docs/advanced-topics-custom-block-render-map.html#content
*/
import { Map } from "immutable";
import { DefaultDraftBlockRenderMap } from "draft-js";

import { Block } from "./constants";

/*
Mapping that returns containers for the various block types.
*/
const RenderMap = Map({
  [Block.CAPTION]: {
    element: "cite"
  },
  [Block.BLOCKQUOTE_CAPTION]: {
    element: "blockquote"
  },
  [Block.TODO]: {
    element: "div"
  },
  [Block.IMAGE]: {
    element: "figure"
  },
  [Block.BREAK]: {
    element: "div"
  }
}).merge(DefaultDraftBlockRenderMap);

export default RenderMap;
