import React from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import {
  Editor,
  EditorState,
  RichUtils,
  SelectionState,
  ContentBlock,
  genKey,
  Modifier,
  KeyBindingUtil,
  getDefaultKeyBinding
} from "draft-js";
import CodeUtils from "draft-js-code";
import isSoftNewlineEvent from "draft-js/lib/isSoftNewlineEvent";
import { OrderedMap } from "immutable";
import AddButton from "./components/toolbar/addbutton";
import Toolbar, { BLOCK_BUTTONS, INLINE_BUTTONS } from "./components/toolbar";
import LinkEditComponent from "./components/toolbar/LinkEditComponent";
import customRendererFn from "./components/customrenderer";
import customStyleMap from "./util/customstylemap";
import RenderMap from "./util/rendermap";
import keyBindingFn from "./util/keybinding";
import { Block, Entity as E, HANDLED, NOT_HANDLED } from "./util/constants";
import beforeInput, { StringToTypeMap } from "./util/beforeinput";
import blockStyleFn from "./util/blockStyleFn";
import {
  getCurrentBlock,
  resetBlockWithType,
  addNewBlockAt,
  isCursorBetweenLink
} from "./model";
import ImageButton from "./components/inline-side-buttons/image-side-button";
import darkTheme from "../../../../themes/dark-theme";
import lightTheme from "../../../../themes/light-theme";

const getStyles = (isDark, isToggled) => {
  return {
    backgroundColor: isDark
      ? darkTheme.editor.backgroundColor
      : lightTheme.editor.backgroundColor,
    color: isDark ? darkTheme.editor.color : lightTheme.editor.color,
    margin: isToggled ? { margin: "0% 35%" } : null
  };
};

const getNotifStyle = isDark => {
  return {
    color: isDark ? darkTheme.editedNotif.color : lightTheme.editedNotif.color,
    border: isDark
      ? darkTheme.editedNotif.border
      : lightTheme.editedNotif.border
  };
};

/*
A wrapper over `draft-js`'s default **Editor** component which provides
some built-in customisations like custom blocks (todo, caption, etc) and
some key handling for ease of use so that users' mouse usage is minimum.
*/
class MediumDraftEditor extends React.Component {
  constructor(props) {
    super(props);

    this.focus = () => this._editorNode.focus();
    this.onChange = (editorState, cb) => {
      this.props.onChange(editorState, cb);
    };

    this.getEditorState = () => {
      return this.props.editorState;
    };

    this.onTab = this.onTab.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.setLink = this.setLink.bind(this);
    this.onUpArrow = this.onUpArrow.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);
    this.editLinkAfterSelection = this.editLinkAfterSelection.bind(this);
  }

  /**
   * Implemented to provide nesting of upto 2 levels in ULs or OLs,
   * and to support tabs in code blocks.
   */
  onTab(e) {
    const { editorState } = this.props;

    /* Handles tab for code blocks. */
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      this.onChange(CodeUtils.onTab(e, editorState));
      return;
    }

    /* Handles tab for OL or UL. */
    const currentBlock = getCurrentBlock(editorState);
    const blockType = currentBlock.getType();

    if (blockType !== Block.UL && blockType !== Block.OL) {
      return;
    }
    const newEditorState = RichUtils.onTab(e, editorState, 2);
    if (newEditorState !== editorState) {
      this.onChange(newEditorState);
    }
  }

  onUpArrow(e) {
    const { editorState } = this.props;
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const key = selection.getAnchorKey();
    const currentBlock = content.getBlockForKey(key);
    const firstBlock = content.getFirstBlock();
    if (firstBlock.getKey() === key) {
      if (firstBlock.getType().indexOf(Block.ATOMIC) === 0) {
        e.preventDefault();
        const newBlock = new ContentBlock({
          type: Block.UNSTYLED,
          key: genKey()
        });
        const newBlockMap = OrderedMap([[newBlock.getKey(), newBlock]]).concat(
          content.getBlockMap()
        );
        const newContent = content.merge({
          blockMap: newBlockMap,
          selectionAfter: selection.merge({
            anchorKey: newBlock.getKey(),
            focusKey: newBlock.getKey(),
            anchorOffset: 0,
            focusOffset: 0,
            isBackward: false
          })
        });
        this.onChange(
          EditorState.push(editorState, newContent, "insert-characters")
        );
      }
    } else if (currentBlock.getType().indexOf(Block.ATOMIC) === 0) {
      const blockBefore = content.getBlockBefore(key);
      if (!blockBefore) {
        return;
      }
      e.preventDefault();
      const newSelection = selection.merge({
        anchorKey: blockBefore.getKey(),
        focusKey: blockBefore.getKey(),
        anchorOffset: blockBefore.getLength(),
        focusOffset: blockBefore.getLength(),
        isBackward: false
      });
      this.onChange(EditorState.forceSelection(editorState, newSelection));
    }
  }

  /*
  Adds a hyperlink on the selected text with some basic checks.
  */
  setLink(url) {
    let { editorState } = this.props;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    let entityKey = null;
    let newUrl = url;
    if (this.props.processURL) {
      newUrl = this.props.processURL(url);
    } else if (url.indexOf("http") === -1) {
      if (url.indexOf("@") >= 0) {
        newUrl = `mailto:${newUrl}`;
      } else {
        newUrl = `http://${newUrl}`;
      }
    }
    if (newUrl !== "") {
      const contentWithEntity = content.createEntity(E.LINK, "MUTABLE", {
        url: newUrl
      });
      editorState = EditorState.push(
        editorState,
        contentWithEntity,
        "create-entity"
      );
      entityKey = contentWithEntity.getLastCreatedEntityKey();
    }
    this.onChange(
      RichUtils.toggleLink(editorState, selection, entityKey),
      this.focus
    );
  }

  /**
   * Override which text modifications are available according BLOCK_BUTTONS style property.
   * Defaults all of them if no toolbarConfig.block passed:
   *   block: ['ordered-list-item', 'unordered-list-item', 'blockquote', 'header-three', 'todo'],
   * Example parameter: toolbarConfig = {
   *   block: ['ordered-list-item', 'unordered-list-item'],
   *   inline: ['BOLD', 'ITALIC', 'UNDERLINE', 'hyperlink'],
   * };
   */
  configureToolbarBlockOptions(toolbarConfig) {
    return toolbarConfig && toolbarConfig.block
      ? toolbarConfig.block
          .map(type => BLOCK_BUTTONS.find(button => button.style === type))
          .filter(button => button !== undefined)
      : this.props.blockButtons;
  }

  /**
   * Override which text modifications are available according INLINE_BUTTONS style property.
   * CASE SENSITIVE. Would be good clean up to lowercase inline styles consistently.
   * Defaults all of them if no toolbarConfig.inline passed:
   *   inline: ['BOLD', 'ITALIC', 'UNDERLINE', 'hyperlink', 'HIGHLIGHT'],
   * Example parameter: toolbarConfig = {
   *   block: ['ordered-list-item', 'unordered-list-item'],
   *   inline: ['BOLD', 'ITALIC', 'UNDERLINE', 'hyperlink'],
   * };
   */
  configureToolbarInlineOptions(toolbarConfig) {
    return toolbarConfig && toolbarConfig.inline
      ? toolbarConfig.inline
          .map(type => INLINE_BUTTONS.find(button => button.style === type))
          .filter(button => button !== undefined)
      : this.props.inlineButtons;
  }

  /*
  Handles custom commands based on various key combinations. First checks
  for some built-in commands. If found, that command's function is apllied and returns.
  If not found, it checks whether parent component handles that command or not.
  Some of the internal commands are:

  - showlinkinput -> Opens up the link input tooltip if some text is selected.
  - add-new-block -> Adds a new block at the current cursor position.
  - changetype:block-type -> If the command starts with `changetype:` and
    then succeeded by the block type, the current block will be converted to that particular type.
  - toggleinline:inline-type -> If the command starts with `toggleinline:` and
    then succeeded by the inline type, the current selection's inline type will be
    toggled.
  */
  handleKeyCommand(e) {
    const { editorState } = this.props;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      if (KeyBindingUtil.hasCommandModifier(e) && e.which === 13) {
        const currentBlock = getCurrentBlock(editorState);
        this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return HANDLED;
      }
    }

    return getDefaultKeyBinding(e);
  }

  /*
  This function is responsible for emitting various commands based on various key combos.
  */
  handleBeforeInput(str) {
    return this.props.beforeInput(
      this.props.editorState,
      str,
      this.onChange,
      this.props.stringToTypeMap
    );
  }

  /*
  By default, it handles return key for inserting soft breaks (BRs in HTML) and
  also instead of inserting a new empty block after current empty block, it first check
  whether the current block is of a type other than `unstyled`. If yes, current block is
  simply converted to an unstyled empty block. If RETURN is pressed on an unstyled block
  default behavior is executed.
  */
  handleReturn(e) {
    if (this.props.handleReturn) {
      const behavior = this.props.handleReturn();
      if (behavior === HANDLED || behavior === true) {
        return HANDLED;
      }
    }
    const { editorState } = this.props;
    if (isSoftNewlineEvent(e)) {
      this.onChange(RichUtils.insertSoftNewline(editorState));
      return HANDLED;
    }
    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      const currentBlock = getCurrentBlock(editorState);
      const blockType = currentBlock.getType();

      if (blockType.indexOf(Block.ATOMIC) === 0) {
        this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return HANDLED;
      }

      if (currentBlock.getLength() === 0) {
        switch (blockType) {
          case Block.UL:
          case Block.OL:
          case Block.BLOCKQUOTE:
          case Block.BLOCKQUOTE_CAPTION:
          case Block.CODE:
          case Block.CAPTION:
          case Block.TODO:
          case Block.H2:
          case Block.H3:
          case Block.H1:
            this.onChange(resetBlockWithType(editorState, Block.UNSTYLED));
            return HANDLED;
          default:
            return NOT_HANDLED;
        }
      }

      if (CodeUtils.hasSelectionInBlock(editorState)) {
        if (
          currentBlock
            .getText()
            .slice(-2)
            .trim() === ""
        ) {
          this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
          return HANDLED;
        }
        this.onChange(CodeUtils.handleReturn(e, editorState));
        return HANDLED;
      }

      const selection = editorState.getSelection();

      if (
        selection.isCollapsed() &&
        currentBlock.getLength() === selection.getStartOffset()
      ) {
        if (this.props.continuousBlocks.indexOf(blockType) < 0) {
          this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
          return HANDLED;
        }
        return NOT_HANDLED;
      }
      return NOT_HANDLED;
    }
    return NOT_HANDLED;
  }

  /*
  The function documented in `draft-js` to be used to toggle block types (mainly
  for some key combinations handled by default inside draft-js).
  */
  _toggleBlockType(blockType) {
    const type = RichUtils.getCurrentBlockType(this.props.editorState);
    if (type.indexOf(`${Block.ATOMIC}:`) === 0) {
      return;
    }
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  /*
  The function documented in `draft-js` to be used to toggle inline styles of selection (mainly
  for some key combinations handled by default inside draft-js).
  */
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }

  removeLink(blockKey, entityKey) {
    const { editorState } = this.props;
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);
    const oldSelection = editorState.getSelection();
    block.findEntityRanges(
      character => {
        const eKey = character.getEntity();
        return eKey === entityKey;
      },
      (start, end) => {
        const selection = new SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: start,
          focusOffset: end
        });
        const newEditorState = EditorState.forceSelection(
          RichUtils.toggleLink(editorState, selection, null),
          oldSelection
        );
        this.onChange(newEditorState, this.focus);
      }
    );
  }

  editLinkAfterSelection(blockKey, entityKey = null) {
    if (entityKey === null) {
      return;
    }
    const { editorState } = this.props;
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);
    block.findEntityRanges(
      character => {
        const eKey = character.getEntity();
        return eKey === entityKey;
      },
      (start, end) => {
        const selection = new SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: start,
          focusOffset: end
        });
        const newEditorState = EditorState.forceSelection(
          editorState,
          selection
        );
        this.onChange(newEditorState);
        setTimeout(() => {
          if (this.toolbar) {
            this.toolbar.handleLinkInput(null, true);
          }
        }, 100);
      }
    );
  }

  /**
   * Handle pasting when cursor is in an image block. Paste the text as the
   * caption. Otherwise, let Draft do its thing.
   */
  handlePastedText(text, html, es) {
    const currentBlock = getCurrentBlock(this.props.editorState);
    if (currentBlock.getType() === Block.IMAGE) {
      const { editorState } = this.props;
      const content = editorState.getCurrentContent();
      this.onChange(
        EditorState.push(
          editorState,
          Modifier.insertText(content, editorState.getSelection(), text)
        )
      );
      return HANDLED;
    }
    if (
      this.props.handlePastedText &&
      this.props.handlePastedText(text, html, es) === HANDLED
    ) {
      return HANDLED;
    }
    return NOT_HANDLED;
  }

  /*
  Renders the `Editor`, `Toolbar` and the side `AddButton`.
  */
  render() {
    const {
      editorState,
      editorEnabled,
      disableToolbar,
      showLinkEditToolbar,
      toolbarConfig,
      currentThread,
      handleDocTitleChange,
      wasDocumentEdited,
      isToggled,
      isDarkTheme
    } = this.props;
    const showAddButton = editorEnabled;
    const editorClass = `md-RichEditor-editor${
      !editorEnabled ? " md-RichEditor-readonly" : ""
    }`;
    let isCursorLink = false;
    if (editorEnabled && showLinkEditToolbar) {
      isCursorLink = isCursorBetweenLink(editorState);
    }
    const blockButtons = this.configureToolbarBlockOptions(toolbarConfig);
    const inlineButtons = this.configureToolbarInlineOptions(toolbarConfig);
    // console.log(isDarkTheme);
    return (
      <div className="editorContent">
        {!disableToolbar && (
          <Toolbar
            ref={c => {
              this.toolbar = c;
            }}
            editorNode={this._editorNode}
            editorState={editorState}
            toggleBlockType={this.toggleBlockType}
            toggleInlineStyle={this.toggleInlineStyle}
            editorEnabled={editorEnabled}
            setLink={this.setLink}
            focus={this.focus}
            blockButtons={blockButtons}
            inlineButtons={inlineButtons}
          />
        )}
        <div
          className="md-RichEditor-root"
          style={getStyles(isDarkTheme, isToggled)}
        >
          <div className="title-container">
            <Textarea
              className="doc-title"
              type="text"
              value={currentThread.title}
              style={{
                backgroundColor: getStyles(isDarkTheme, null).backgroundColor,
                color: getStyles(isDarkTheme, null).color
              }}
              onChange={event => handleDocTitleChange(event.target.value)}
            />
            {wasDocumentEdited ? (
              <div
                className="is-edited-notif"
                style={getNotifStyle(isDarkTheme)}
              >
                Edited
              </div>
            ) : null}
          </div>
          <div className="update-time">
            {currentThread.date === "Unsaved"
              ? "New thread has not been saved yet."
              : `Last Saved: ${currentThread.date}`}
          </div>
          <div className={editorClass} style={{ WebkitAppRegion: "no-drag" }}>
            <Editor
              ref={node => {
                this._editorNode = node;
              }}
              {...this.props}
              editorState={editorState}
              blockRendererFn={this.props.rendererFn(
                this.onChange,
                this.getEditorState,
                isDarkTheme
              )}
              blockStyleFn={this.props.blockStyleFn}
              onChange={this.onChange}
              onTab={this.onTab}
              onUpArrow={this.onUpArrow}
              blockRenderMap={this.props.blockRenderMap}
              handleBeforeInput={this.handleBeforeInput}
              handleReturn={this.handleReturn}
              handlePastedText={this.handlePastedText}
              customStyleMap={this.props.customStyleMap}
              readOnly={!editorEnabled}
              keyBindingFn={this.handleKeyCommand}
              placeholder={this.props.placeholder}
              spellCheck={editorEnabled && this.props.spellCheck}
            />
            {this.props.sideButtons.length > 0 &&
              showAddButton && (
                <AddButton
                  editorState={editorState}
                  getEditorState={this.getEditorState}
                  setEditorState={this.onChange}
                  focus={this.focus}
                  sideButtons={this.props.sideButtons}
                  isDarkTheme={this.props.isDarkTheme}
                />
              )}
            {isCursorLink && (
              <LinkEditComponent
                {...isCursorLink}
                editorState={editorState}
                removeLink={this.removeLink}
                editLink={this.editLinkAfterSelection}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

MediumDraftEditor.propTypes = {
  beforeInput: PropTypes.func,
  keyBindingFn: PropTypes.func,
  customStyleMap: PropTypes.object,
  blockStyleFn: PropTypes.func,
  rendererFn: PropTypes.func,
  editorEnabled: PropTypes.bool,
  spellCheck: PropTypes.bool,
  stringToTypeMap: PropTypes.object,
  blockRenderMap: PropTypes.object,
  blockButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.object
      ]),
      style: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string
    })
  ),
  inlineButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.object
      ]),
      style: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  continuousBlocks: PropTypes.arrayOf(PropTypes.string),
  sideButtons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.func
    })
  ),
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleReturn: PropTypes.func,
  handlePastedText: PropTypes.func,
  disableToolbar: PropTypes.bool,
  showLinkEditToolbar: PropTypes.bool,
  toolbarConfig: PropTypes.object,
  processURL: PropTypes.func,
  handleDocTitleChange: PropTypes.func,
  wasDocumentEdited: PropTypes.bool.isRequired,
  currentThread: PropTypes.any,
  isToggled: PropTypes.bool.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
};

MediumDraftEditor.defaultProps = {
  beforeInput,
  keyBindingFn,
  customStyleMap,
  blockStyleFn,
  rendererFn: customRendererFn,
  editorEnabled: true,
  spellCheck: true,
  stringToTypeMap: StringToTypeMap,
  blockRenderMap: RenderMap,
  blockButtons: BLOCK_BUTTONS,
  inlineButtons: INLINE_BUTTONS,
  placeholder: "Write your story...",
  continuousBlocks: [
    Block.UNSTYLED,
    Block.BLOCKQUOTE,
    Block.OL,
    Block.UL,
    Block.CODE,
    Block.TODO
  ],
  sideButtons: [
    {
      title: "Image",
      component: ImageButton
    }
  ],
  disableToolbar: false,
  showLinkEditToolbar: true,
  toolbarConfig: {}
};

export default MediumDraftEditor;
