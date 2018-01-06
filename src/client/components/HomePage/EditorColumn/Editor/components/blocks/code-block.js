import React from "react";
import PrismLanguages from "prism-languages";
import { EditorBlock } from "draft-js";

export default props => (
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
      <EditorBlock {...props} />
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
        <select>
          {Object.keys(PrismLanguages).map(language => (
            <option value={language}>{language}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);
