import React from "react";
import PropTypes from "prop-types";
import PrismLanguages from "prism-languages";
import { EditorBlock } from "draft-js";

import { getCurrentBlock, updateDataOfBlock } from "../../model/";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "javascript", selected: "false" };
    this.updateData = this.updateData.bind(this);
  }

  updateData(event) {
    this.setState({ value: event.target.value });
    const { block, blockProps } = this.props;
    const { setEditorState, getEditorState } = blockProps;
    const data = block.getData();
    const newData = data.set("syntax", event.target.value);
    setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    const { block, blockProps } = this.props;
    const { getEditorState } = blockProps;
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
        style={{ display: "flex", flexDirection: "column", padding: "0px" }}
      >
        <div style={{ padding: "20px" }}>
          <EditorBlock {...this.props} />
        </div>
        <div
          className="code-block-footer"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            top: "30px"
          }}
        >
          <div
            className="dropdown"
            style={showDropdown ? null : { visibility: "hidden" }}
          >
            <select onChange={this.updateData} value={this.state.value}>
              {Object.keys(PrismLanguages).map(language => (
                <option value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

CodeBlock.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.object
};
