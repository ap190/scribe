import React, { Component } from "react";
import PropTypes from "prop-types";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { getSelectedBlockNode } from "../../util";
import lightTheme from "../../../../../../themes/light-theme";
import darkTheme from "../../../../../../themes/dark-theme";

const getStyle = isDark => {
  return {
    background: isDark
      ? darkTheme.floatingButton.background
      : lightTheme.floatingButton.background,
    border: isDark
      ? darkTheme.floatingButton.border
      : lightTheme.floatingButton.border
  };
};

/*
Implementation of the medium-link side `+` button to insert various rich blocks
like Images/Embeds/Videos.
*/
class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      visible: false,
      isOpen: false
    };
    this.node = null;
    this.blockKey = "";
    this.blockType = "";
    this.blockLength = -1;
    this.findNode = this.findNode.bind(this);
    this.hideBlock = this.hideBlock.bind(this);
    this.openToolbar = this.openToolbar.bind(this);
  }

  // To show + button only when text length == 0
  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    if (
      !selectionState.isCollapsed() ||
      selectionState.anchorKey !== selectionState.focusKey ||
      contentState
        .getBlockForKey(selectionState.getAnchorKey())
        .getType()
        .indexOf("atomic") >= 0
    ) {
      // console.log('no sel');
      this.hideBlock();
      return;
    }
    const block = contentState.getBlockForKey(selectionState.anchorKey);
    const bkey = block.getKey();
    if (block.getLength() > 0) {
      this.hideBlock();
      return;
    }
    if (block.getType() !== this.blockType) {
      this.blockType = block.getType();
      if (block.getLength() === 0) {
        setTimeout(this.findNode, 0);
      }
      this.blockKey = bkey;
      return;
    }
    if (this.blockKey === bkey) {
      // console.log('block exists');
      if (block.getLength() > 0) {
        this.hideBlock();
      } else {
        this.setState({
          visible: true
        });
      }
      return;
    }
    this.blockKey = bkey;
    if (block.getLength() > 0) {
      // console.log('no len');
      this.hideBlock();
      return;
    }
    setTimeout(this.findNode, 0);
  }

  hideBlock() {
    if (this.state.visible) {
      this.setState({
        visible: false,
        isOpen: false
      });
    }
  }

  openToolbar() {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        // callback function
        // save page state
        const x = window.scrollX;
        const y = window.scrollY;
        // do focus
        this.props.focus();
        // back previous window state
        window.scrollTo(x, y);
      }
    );
  }

  findNode() {
    // eslint-disable-next-line no-undef
    const node = getSelectedBlockNode(window);
    if (node === this.node) {
      // console.log('Node exists');
      return;
    }
    if (!node) {
      // console.log('no node');
      this.setState({
        visible: false,
        isOpen: false
      });
      return;
    }
    // const rect = node.getBoundingClientRect();
    this.node = node;
    this.setState({
      visible: true,
      style: {
        top: node.offsetTop
      }
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <div className="md-side-toolbar" style={this.state.style}>
        <button
          onClick={this.openToolbar}
          className={`md-sb-button md-add-button${
            this.state.isOpen ? " md-open-button" : ""
          }`}
          type="button"
          style={getStyle(this.props.isDarkTheme)}
        >
          <img
            src={
              this.props.isDarkTheme
                ? darkTheme.icons.addEditor
                : lightTheme.icons.addEditor
            }
            alt="Add Content"
            height="15"
            width="15"
          />
        </button>
        {this.state.isOpen ? (
          <CSSTransitionGroup
            transitionName="md-example"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}
            transitionAppearTimeout={100}
            transitionAppear
          >
            {this.props.sideButtons.map(button => {
              const Button = button.component;
              const extraProps = button.props ? button.props : {};
              return (
                <Button
                  key={button.title}
                  {...extraProps}
                  editorState={this.props.editorState}
                  getEditorState={this.props.getEditorState}
                  setEditorState={this.props.setEditorState}
                  close={this.openToolbar}
                  toggleModal={button.toggleModal}
                  handleAddEmbeddedContent={button.handleAddEmbeddedContent}
                  isDarkTheme={this.props.isDarkTheme}
                />
              );
            })}
          </CSSTransitionGroup>
        ) : null}
      </div>
    );
  }
}

AddButton.propTypes = {
  focus: PropTypes.func,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  sideButtons: PropTypes.arrayOf(PropTypes.object),
  editorState: PropTypes.any,
  isDarkTheme: PropTypes.bool.isRequired
};

export default AddButton;
