import getEntityRanges from "../util/getEntityRanges";
import { Block, Entity, Inline } from "../util/constants";

const { BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE } = Inline;

const CODE_INDENT = "    ";

function encodeContent(text) {
  return text.replace(/[*_`]/g, "\\$&");
}

// Escape quotes using backslash.
function escapeTitle(text) {
  return text.replace(/"/g, '\\"');
}

// Encode chars that would normally be allowed in a URL but would conflict with
// our markdown syntax: `[foo](http://foo/)`
function encodeURL(url) {
  return url.replace(/\)/g, "%29");
}

class MarkupGenerator {
  constructor(contentState) {
    this.contentState = contentState;
  }

  generate() {
    this.output = [];
    this.blocks = this.contentState.getBlockMap().toArray();
    this.totalBlocks = this.blocks.length;
    this.currentBlock = 0;
    this.listItemCounts = {};
    while (this.currentBlock < this.totalBlocks) {
      this.processBlock();
    }
    return this.output.join("");
  }

  processBlock() {
    let block = this.blocks[this.currentBlock];
    let blockType = block.getType();
    switch (blockType) {
      case Block.H1: {
        this.insertLineBreaks(1);
        this.output.push("# " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.H2: {
        this.insertLineBreaks(1);
        this.output.push("## " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.H3: {
        this.insertLineBreaks(1);
        this.output.push("### " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.H4: {
        this.insertLineBreaks(1);
        this.output.push("#### " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.H5: {
        this.insertLineBreaks(1);
        this.output.push("##### " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.H6: {
        this.insertLineBreaks(1);
        this.output.push("###### " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.IMAGE: {
        this.insertLineBreaks(1);
        // console.log("BLOCK IMAGE IS ", block.getType());
        // console.log(block.getData());
        // console.log(block.getData().get("src"));
        this.output.push(this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.UNORDERED_LIST_ITEM: {
        let blockDepth = block.getDepth();
        let lastBlock = this.getLastBlock();
        let lastBlockType = lastBlock ? lastBlock.getType() : null;
        let lastBlockDepth =
          lastBlock && canHaveDepth(lastBlockType)
            ? lastBlock.getDepth()
            : null;
        if (lastBlockType !== blockType && lastBlockDepth !== blockDepth - 1) {
          this.insertLineBreaks(1);
          // Insert an additional line break if following opposite list type.
          if (lastBlockType === Block.ORDERED_LIST_ITEM) {
            this.insertLineBreaks(1);
          }
        }
        let indent = " ".repeat(block.depth * 4);
        this.output.push(indent + "- " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.ORDERED_LIST_ITEM: {
        let blockDepth = block.getDepth();
        let lastBlock = this.getLastBlock();
        let lastBlockType = lastBlock ? lastBlock.getType() : null;
        let lastBlockDepth =
          lastBlock && canHaveDepth(lastBlockType)
            ? lastBlock.getDepth()
            : null;
        if (lastBlockType !== blockType && lastBlockDepth !== blockDepth - 1) {
          this.insertLineBreaks(1);
          // Insert an additional line break if following opposite list type.
          if (lastBlockType === Block.UNORDERED_LIST_ITEM) {
            this.insertLineBreaks(1);
          }
        }
        let indent = " ".repeat(blockDepth * 4);
        // TODO: figure out what to do with two-digit numbers
        let count = this.getListItemCount(block) % 10;
        this.output.push(
          indent + `${count}. ` + this.renderBlockContent(block) + "\n"
        );
        break;
      }
      case Block.BLOCKQUOTE: {
        this.insertLineBreaks(1);
        this.output.push(" > " + this.renderBlockContent(block) + "\n");
        break;
      }
      case Block.CODE: {
        this.insertLineBreaks(1);
        this.output.push(CODE_INDENT + this.renderBlockContent(block) + "\n");
        break;
      }
      default: {
        this.insertLineBreaks(1);
        this.output.push(this.renderBlockContent(block) + "\n");
        break;
      }
    }
    this.currentBlock += 1;
  }

  getLastBlock() {
    return this.blocks[this.currentBlock - 1];
  }

  getNextBlock() {
    return this.blocks[this.currentBlock + 1];
  }

  getListItemCount(block) {
    let blockType = block.getType();
    let blockDepth = block.getDepth();
    // To decide if we need to start over we need to backtrack (skipping list
    // items that are of greater depth)
    let index = this.currentBlock - 1;
    let prevBlock = this.blocks[index];
    while (
      prevBlock &&
      canHaveDepth(prevBlock.getType()) &&
      prevBlock.getDepth() > blockDepth
    ) {
      index -= 1;
      prevBlock = this.blocks[index];
    }
    if (
      !prevBlock ||
      prevBlock.getType() !== blockType ||
      prevBlock.getDepth() !== blockDepth
    ) {
      this.listItemCounts[blockDepth] = 0;
    }
    return (this.listItemCounts[blockDepth] =
      this.listItemCounts[blockDepth] + 1);
  }

  insertLineBreaks() {
    if (this.currentBlock > 0) {
      this.output.push("\n");
    }
  }

  renderBlockContent(block) {
    let { contentState } = this;
    let blockType = block.getType();
    let text = block.getText();
    if (text === "" && blockType !== Block.IMAGE) {
      // Prevent element collapse if completely empty.
      // TODO: Replace with constant.
      return "\u200B";
    }
    let charMetaList = block.getCharacterList();
    let entityPieces = getEntityRanges(text, charMetaList);
    return entityPieces
      .map(([entityKey, stylePieces]) => {
        let content = stylePieces
          .map(([text, style]) => {
            // Don't allow empty inline elements.
            if (!text) {
              return "";
            }
            let content = encodeContent(text);
            if (style.has(BOLD)) {
              content = `**${content}**`;
            }
            if (style.has(UNDERLINE)) {
              // TODO: encode `+`?
              content = `++${content}++`;
            }
            if (style.has(ITALIC)) {
              content = `_${content}_`;
            }
            if (style.has(STRIKETHROUGH)) {
              // TODO: encode `~`?
              content = `~~${content}~~`;
            }
            if (style.has(CODE)) {
              content =
                blockType === Block.CODE ? content : "`" + content + "`";
            }
            return content;
          })
          .join("");

        if (block != null && block.getType() === Block.IMAGE) {
          let data = block.getData();
          let src = data.get("src") || "";
          let alt = data.alt ? `${escapeTitle(data.alt)}` : "";
          return `![${alt}](${encodeURL(src)})`;
        }

        let entity = entityKey ? contentState.getEntity(entityKey) : null;
        if (entity != null && entity.getType() === Entity.LINK) {
          let data = entity.getData();
          let url = data.url || "";
          let title = data.title ? ` "${escapeTitle(data.title)}"` : "";
          return `[${content}](${encodeURL(url)}${title})`;
        }
        return content;
      })
      .join("");
  }
}

function canHaveDepth(blockType) {
  switch (blockType) {
    case Block.UNORDERED_LIST_ITEM:
    case Block.ORDERED_LIST_ITEM:
      return true;
    default:
      return false;
  }
}

export default function stateToMarkdown(content) {
  return new MarkupGenerator(content).generate();
}
