import React from "react";
import PropTypes from "prop-types";
import PrismLanguages from "prism-languages";
import { EditorBlock } from "draft-js";

import { getCurrentBlock, updateDataOfBlock } from "../../model/";
import darkTheme from "../../../../../../themes/dark-theme";
import index from "../../../../AsideColumn/index";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    const { block } = this.props;
    const language = block.getData().get("syntax");
    this.state = { lang: language || "javascript", selected: "false" };
    this.updateData = this.updateData.bind(this);
  }

  updateData(event) {
    this.setState({ lang: event.target.value });
    const { block, blockProps } = this.props;
    const { setEditorState, getEditorState } = blockProps;
    const data = block.getData();
    const newData = data.set("syntax", event.target.value);
    setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    const { block, blockProps } = this.props;
    const lines = block.text.split(/\n/g);
    const { getEditorState, isDarkTheme } = blockProps;
    const key = block.getKey();
    const editorState = getEditorState();
    const currentblock = getCurrentBlock(editorState);
    let showDropdown;
    if (currentblock.getKey() === key) {
      showDropdown = true;
    } else {
      showDropdown = false;
    }
    return (
      <div
        className="code-block-container"
        style={isDarkTheme ? { border: "1px solid #4a4a4a" } : null}
      >
        <div className="code-block-header">
          {"</>"}
          <div
            className="dropdown"
            style={showDropdown ? null : { visibility: "hidden" }}
          >
            <select onChange={this.updateData} value={this.state.lang}>
              {Object.keys(PrismLanguages).map((language, idx) => (
                <option value={language} key={idx}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="code-editor-container">
          <div className="code-line-number">
            {lines.map((elt, eltIdx) => <div>{eltIdx + 1}</div>)}
          </div>
          <EditorBlock className="test" {...this.props} />
        </div>
      </div>
    );
  }
}

CodeBlock.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.object
};
