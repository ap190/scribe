import React from "react";
import { Images } from "../../../../../themes";
console.log(Images);

const OpenWorkspace = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>
      How do I open previously saved workspaces?
    </h4>
    If you have saved a workspace in the past you are going to want to open it.
    <br />
    <b>Lets open a workspace together</b>.
    <br />
    <br />
    <b>Step 1: Click on the application menu </b> and select{" "}
    <b>Open Workspace</b>
    <br />
    <br />
    <img src={Images.openWorkspaceMenu} alt="Open workspace" />
    <br />
    <br />
    <b>Step 2: Navigate to where you saved your work </b> and click open.
    <br />
    <br />
    <img src={Images.openWorkspaceDialogue} alt="Select via native dialogue" />
    <br />
    <br />
    <b>Step 3: Your workspace has been loaded. </b> Pick up your work where you
    left off!
    <br />
    <br />
    <img src={Images.openWorkspaceFinal} alt="Workspace loaded" />
  </div>
);

OpenWorkspace.propTypes = {};

OpenWorkspace.defaultProps = {};

export default OpenWorkspace;
