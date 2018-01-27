import React from "react";
import { Images } from "../../../../../themes";

// notebookTutorial

const AddThread = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>What is a thread?</h4>
    Notebooks are <b>organized into sub-categories</b> called <b>threads</b>.
    Lets create a new thread.
    <br />
    <br />
    <b>Step 1: Select a notebook </b> by clicking on a notebook in the left most
    column.
    <br />
    <br />
    <img src={Images.addThreadSelectChannel} alt="Select a channel" />
    <br />
    <br />
    <b>Step 2: Add a Thread </b> by clicking on the add a thread button.
    <br />
    <br />
    <img src={Images.addThreadNewButton} alt="Create a thread" />
    <br />
    <br />
    <b>Step 3: Set a thread title </b> Once you set the thread title, create a
    document. A document can be code documentation, a summary of your work or
    helpful notes.
    <br />
    <br />
    <img src={Images.addThreadSetTitle} alt="Set Thread Title" />
  </div>
);

AddThread.propTypes = {};

AddThread.defaultProps = {};

export default AddThread;
