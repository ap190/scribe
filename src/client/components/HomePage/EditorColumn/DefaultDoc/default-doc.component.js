import React from "react";
import DemoBox from "./DemoBox/demo-box.component";
import NotebookExplanation from "./Explanations/notebook.component";
import AddThreadExplanation from "./Explanations/addthread.component";

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
      below.
    </div>
    <DemoBox
      sectionTitle="Notebooks"
      subTitle="organize docs into notebooks"
      explanationBlurb={NotebookExplanation}
    >
      <NotebookExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Add a thread"
      subTitle="create threads to document your work"
      explanationBlurb=""
    >
      <AddThreadExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Open a Project"
      subTitle="add documentation to an existing project"
      explanationBlurb=""
    />
    <DemoBox
      sectionTitle="Shortcuts"
      subTitle="learn shortcuts to speed up your workflow"
      explanationBlurb=""
    />
  </div>
);

export default DefaultDoc;
