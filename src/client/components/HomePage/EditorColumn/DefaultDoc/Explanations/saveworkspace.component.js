import React from "react";
import { Images } from "../../../../../themes";

const SaveWorkspace = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>How can I save my work?</h4>
    Lets walk through saving a project.
    <br />
    <br />
    <b>Step 1: Click on the application menu </b> and select{" "}
    <b> Save Workspace </b>
    <br />
    <br />
    <img src={Images.addThreadSelectChannel} alt="Select a channel" />
    <br />
    <br />
    <b>Step 2: Select a directory </b> to have your work saved in.
    <br />
    <br />
    <img src={Images.addThreadNewButton} alt="Create a thread" />
    <br />
    <br />
    <b>Step 3: Your work is saved. </b> You can now close Scribe and open your
    notes whenever you want.
    <br />
    <br />
    <img src={Images.addThreadSetTitle} alt="Set Thread Title" />
  </div>
);

SaveWorkspace.propTypes = {};

SaveWorkspace.defaultProps = {};

export default SaveWorkspace;
