import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  ContentState
} from "draft-js";

import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";

import Link, { findLinkEntities } from "../components/entities/link";

const defaultDecorators = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

const prismDecorator = new PrismDecorator({ prism: Prism });

// const decorators = {}

const createEditorState = (content = null, decorators = prismDecorator) => {
  console.log("here!");
  let contentState = null;
  // if (content === null) {
  //   // contentState = convertFromRaw({
  //   //   entityMap: {},
  //   //   blocks: [
  //   //     {
  //   //       type: "header-one",
  //   //       text: "Demo for draft-js-prism"
  //   //     },
  //   //     {
  //   //       type: "unstyled",
  //   //       text: "Type some JavaScript below:"
  //   //     },
  //   //     {
  //   //       type: "code-block",
  //   //       text: 'var message = "This is awesome!";'
  //   //     }
  //   //   ]
  //   // });
  //   // console.log("here!");
  // }

  // if (typeof content === "string") {
  //   contentState = ContentState.createFromText(content);
  // } else {
  //   contentState = convertFromRaw(content);
  // }
  contentState = convertFromRaw({
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
        text: 'var message = "This is awesome!";'
      }
    ]
  });

  return EditorState.createWithContent(contentState, decorators);
};

export default createEditorState;
