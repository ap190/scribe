import React from "react";
import DemoBox from "./DemoBox/demo-box.component";
import NotebookExplanation from "./Explanations/notebook.component";
import AddThreadExplanation from "./Explanations/addthread.component";
import CreateDocExplanation from "./Explanations/createdoc.component";
import OpenWorkspaceExplanation from "./Explanations/openworkspace.component";
import SaveWorkspaceExplanation from "./Explanations/saveworkspace.component";

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
      sectionTitle="Create a Notebook"
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
      sectionTitle="Creating a document"
      subTitle="Create documents with our Medium-like editor"
      explanationBlurb=""
    >
      <CreateDocExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Embed rich media"
      subTitle="Embed code snippets, youtube videos, stack overflow links and much more..."
      explanationBlurb=""
    >
      <AddThreadExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Save a Project"
      subTitle="Save your notes"
      explanationBlurb=""
    >
      <SaveWorkspaceExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Open a Project"
      subTitle="add documentation to an existing project"
      explanationBlurb=""
    >
      <OpenWorkspaceExplanation />
    </DemoBox>
    <DemoBox
      sectionTitle="Shortcuts"
      subTitle="learn shortcuts to speed up your workflow"
      explanationBlurb=""
    />
    <DemoBox
      sectionTitle="Export to Markdown"
      subTitle="Export documents to Markdown"
      explanationBlurb=""
    >
      <AddThreadExplanation />
    </DemoBox>
  </div>
);

export default DefaultDoc;
