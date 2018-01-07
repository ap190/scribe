import React from "react";
import PropTypes from "prop-types";
import PrismLanguages from "prism-languages";
import { EditorBlock } from "draft-js";

import { updateDataOfBlock } from "../../model/";

export default class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  updateData(event) {
    const { block, blockProps } = this.props;
    const { setEditorState, getEditorState } = blockProps;
    const data = block.getData();
    const newData = data.set("syntax", event.target.value);
    setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    return (
      <div
        className="code-block-container"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0px",
          backgroundColor: "rgba(0, 0, 0, 0.05)"
        }}
      >
        <div style={{ padding: "20px" }}>
          <EditorBlock {...this.props} />
        </div>
        <div
          className="code-block-footer"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.10)",
            display: "flex",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          <div className="dropdown">
            <select onChange={this.updateData} value="javascript">
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
