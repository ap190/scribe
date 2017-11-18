import UUIDv4 from "uuid/v4";
import {
  GREY_HIGHLIGHT,
  RED_HIGHLIGHT,
  PURPLE_HIGHLIGHT
} from "../../utils/const";

export default {
  files: [
    {
      module: "README.md",
      lastPosted: "4 days ago",
      id: UUIDv4(),
      threads: [
        {
          text: "Getting Started with npm",
          title: "Set Up Guide",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: GREY_HIGHLIGHT,
          module: "README.md"
        },
        {
          text: "hey here!",
          title: "elephant",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          module: "README.md"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          module: "README.md"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: PURPLE_HIGHLIGHT,
          module: "README.md"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          module: "README.md"
        }
      ]
    },
    {
      module: ".git",
      lastPosted: "21 minutes ago",
      id: UUIDv4(),
      threads: []
    },
    {
      module: ".gitignore",
      lastPosted: "1 day ago",
      id: UUIDv4(),
      threads: [
        {
          text: "lala land!",
          title: "code",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: GREY_HIGHLIGHT,
          module: ".gitignore"
        },
        {
          text: "scribe is king",
          title: "elephant",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          module: ".gitignore"
        },
        {
          text: "the best thing ever",
          title: "amazing tool",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          module: ".gitignore"
        }
      ]
    }
  ]
};
