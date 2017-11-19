import UUIDv4 from "uuid/v4";
import { highlightColor } from "../themes";

const {
  GREY_HIGHLIGHT,
  RED_HIGHLIGHT,
  BLUE_HIGHLIGHT,
  PURPLE_HIGHLIGHT,
  YELLOW_HIGHLIGHT
} = highlightColor;

export default {
  channels: [
    {
      channelName: "# design stuff",
      lastPosted: "4 days ago",
      id: UUIDv4(),
      selected: false,
      threads: [
        {
          text: "hey there~!",
          title: "giraffe",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: GREY_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey here!",
          title: "elephant",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: BLUE_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: PURPLE_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: YELLOW_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: PURPLE_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          selected: false,
          channelName: "# design stuff"
        }
      ]
    },
    {
      channelName: "# backend",
      lastPosted: "21 minutes ago",
      id: UUIDv4(),
      selected: false,
      threads: []
    },
    {
      channelName: "# business clients",
      lastPosted: "1 day ago",
      id: UUIDv4(),
      selected: false,
      threads: [
        {
          text: "hey there~!",
          title: "giraffe",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: GREY_HIGHLIGHT,
          selected: false,
          channelName: "# business clients"
        },
        {
          text: "hey here!",
          title: "elephant",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          selected: false,
          channelName: "# business clients"
        },
        {
          text: "hey over there~!",
          title: "penguin",
          date: Date.now(),
          id: UUIDv4(),
          highlightColor: RED_HIGHLIGHT,
          selected: false,
          channelName: "# business clients"
        }
      ]
    }
  ]
};
