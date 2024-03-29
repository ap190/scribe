import PropTypes from "prop-types";
// import './toolbar.scss';

import React from "react";
import ReactDOM from "react-dom";

import BlockToolbar from "./blocktoolbar";
import InlineToolbar from "./inlinetoolbar";
import { BLOCK_BUTTONS, INLINE_BUTTONS } from "./tool-bar-buttons";

import { getSelection, getSelectionRect } from "../../util/index";
import { getCurrentBlock } from "../../model/index";
import { Entity, HYPERLINK } from "../../util/constants";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      urlInputValue: ""
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleLinkInput = this.handleLinkInput.bind(this);
    this.hideLinkInput = this.hideLinkInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    if (!newProps.editorEnabled) {
      return;
    }
    const selectionState = editorState.getSelection();
    if (selectionState.isCollapsed()) {
      if (this.state.showURLInput) {
        this.setState({
          showURLInput: false,
          urlInputValue: ""
        });
      }
    }
  }

  // shouldComponentUpdate(newProps, newState) {
  //   console.log(newState, this.state);
  //   if (newState.showURLInput !== this.state.showURLInput && newState.urlInputValue !== this.state.urlInputValue) {
  //     return true;
  //   }
  //   return false;
  // }

  componentDidUpdate() {
    if (!this.props.editorEnabled || this.state.showURLInput) {
      return;
    }
    const selectionState = this.props.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return;
    }
    // eslint-disable-next-line no-undef
    const nativeSelection = getSelection(window);
    if (!nativeSelection.rangeCount) {
      return;
    }
    const selectionBoundary = getSelectionRect(nativeSelection);

    // eslint-disable-next-line react/no-find-dom-node
    const toolbarNode = ReactDOM.findDOMNode(this);
    const toolbarBoundary = toolbarNode.getBoundingClientRect();

    // eslint-disable-next-line react/no-find-dom-node
    const parent = ReactDOM.findDOMNode(this.props.editorNode);
    const parentBoundary = parent.getBoundingClientRect();

    /*
    * Main logic for setting the toolbar position.
    */
    toolbarNode.style.top = `${selectionBoundary.top -
      toolbarBoundary.height -
      70}px`;
    const widthDiff = selectionBoundary.width - toolbarBoundary.width;
    if (widthDiff >= 0) {
      toolbarNode.style.left = `${widthDiff / 2}px`;
    } else {
      const left = selectionBoundary.left - parentBoundary.left;
      toolbarNode.style.left = `${left + 35 + widthDiff / 2}px`;
    }
  }

  onKeyDown(e) {
    if (e.which === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.setLink(this.state.urlInputValue);
      this.hideLinkInput();
    } else if (e.which === 27) {
      this.hideLinkInput();
    }
  }

  onChange(e) {
    this.setState({
      urlInputValue: e.target.value
    });
  }

  handleLinkInput(e, direct = false) {
    if (direct !== true) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      this.props.focus();
      return;
    }
    const currentBlock = getCurrentBlock(editorState);
    let selectedEntity = "";
    let linkFound = false;
    currentBlock.findEntityRanges(
      character => {
        const entityKey = character.getEntity();
        selectedEntity = entityKey;
        return (
          entityKey !== null &&
          editorState
            .getCurrentContent()
            .getEntity(entityKey)
            .getType() === Entity.LINK
        );
      },
      (start, end) => {
        let selStart = selection.getAnchorOffset();
        let selEnd = selection.getFocusOffset();
        if (selection.getIsBackward()) {
          selStart = selection.getFocusOffset();
          selEnd = selection.getAnchorOffset();
        }
        if (start === selStart && end === selEnd) {
          linkFound = true;
          const { url } = editorState
            .getCurrentContent()
            .getEntity(selectedEntity)
            .getData();
          this.setState(
            {
              showURLInput: true,
              urlInputValue: url
            },
            () => {
              setTimeout(() => {
                this.urlinput.focus();
                this.urlinput.select();
              }, 0);
            }
          );
        }
      }
    );
    if (!linkFound) {
      this.setState(
        {
          showURLInput: true
        },
        () => {
          setTimeout(() => {
            this.urlinput.focus();
          }, 0);
        }
      );
    }
  }

  hideLinkInput(e = null) {
    if (e !== null) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState(
      {
        showURLInput: false,
        urlInputValue: ""
      },
      this.props.focus
    );
  }

  render() {
    const { editorState, editorEnabled, inlineButtons } = this.props;
    const { showURLInput, urlInputValue } = this.state;
    let isOpen = true;
    if (!editorEnabled || editorState.getSelection().isCollapsed()) {
      isOpen = false;
    }
    if (showURLInput) {
      let className = `md-editor-toolbar${
        isOpen ? " md-editor-toolbar--isopen" : ""
      }`;
      className += " md-editor-toolbar--linkinput";
      return (
        <div className={className}>
          <div
            className="md-RichEditor-controls md-RichEditor-show-link-input"
            style={{ display: "block" }}
          >
            <span className="md-url-input-close" onClick={this.hideLinkInput}>
              &times;
            </span>
            <input
              ref={node => {
                this.urlinput = node;
              }}
              type="text"
              className="md-url-input"
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}
              placeholder="Press ENTER or ESC"
              value={urlInputValue}
            />
          </div>
        </div>
      );
    }
    let hasHyperLink = false;
    let hyperlinkLabel = "#";
    let hyperlinkDescription = "Add a link";
    for (let cnt = 0; cnt < inlineButtons.length; cnt++) {
      if (inlineButtons[cnt].style === HYPERLINK) {
        hasHyperLink = true;
        if (inlineButtons[cnt].label) {
          hyperlinkLabel = inlineButtons[cnt].label;
        }
        if (inlineButtons[cnt].description) {
          hyperlinkDescription = inlineButtons[cnt].description;
        }
        break;
      }
    }
    return (
      <div
        className={`md-editor-toolbar${
          isOpen ? " md-editor-toolbar--isopen" : ""
        }`}
      >
        {this.props.blockButtons.length > 0 ? (
          <BlockToolbar
            editorState={editorState}
            onToggle={this.props.toggleBlockType}
            buttons={this.props.blockButtons}
          />
        ) : null}
        {this.props.inlineButtons.length > 0 ? (
          <InlineToolbar
            editorState={editorState}
            onToggle={this.props.toggleInlineStyle}
            buttons={this.props.inlineButtons}
          />
        ) : null}
        {hasHyperLink && (
          <div className="md-RichEditor-controls">
            <span
              className="md-RichEditor-styleButton md-RichEditor-linkButton hint--top"
              onClick={this.handleLinkInput}
              aria-label={hyperlinkDescription}
            >
              {hyperlinkLabel}
            </span>
          </div>
        )}
      </div>
    );
  }
}

Toolbar.propTypes = {
  editorEnabled: PropTypes.bool,
  editorState: PropTypes.object,
  toggleBlockType: PropTypes.func,
  toggleInlineStyle: PropTypes.func,
  inlineButtons: PropTypes.arrayOf(PropTypes.object),
  blockButtons: PropTypes.arrayOf(PropTypes.object),
  editorNode: PropTypes.object,
  setLink: PropTypes.func,
  focus: PropTypes.func
};

Toolbar.defaultProps = {
  blockButtons: BLOCK_BUTTONS,
  inlineButtons: INLINE_BUTTONS
};
