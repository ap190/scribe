import React from "react";
import PropTypes from "prop-types";
import DemoBox from "./DemoBox/demo-box.component";

const DefaultDoc = () => (
  <div className="md-RichEditor-root">
    <div className="doc-title" style={{ marginBottom: "12px" }}>
      Welcome Guide{" "}
    </div>
    <div
      style={{
        marginBottom: "12px",
        borderBottom: "1px solid hsl(0,0%,88%)",
        paddingBottom: "2rem"
      }}
    >
      Get started using Scribe by Mindflow.ai by clicking on any of the demos
      bellow.
    </div>
    <DemoBox
      sectionTitle="Notebooks"
      subTitle="organize docs into notebooks"
      explanationBlurb=""
    />
    <DemoBox
      sectionTitle="Add a thread"
      subTitle="organize docs into notebooks"
      explanationBlurb=""
    />
    <DemoBox
      sectionTitle="Open a Project"
      subTitle="organize docs into notebooks"
      explanationBlurb=""
    />
    <DemoBox
      sectionTitle="Shortcuts"
      subTitle="organize docs into notebooks"
      explanationBlurb=""
    />
  </div>
);

export default DefaultDoc;
