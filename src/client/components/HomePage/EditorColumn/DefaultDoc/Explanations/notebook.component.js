import React from "react";
import { Images } from "../../../../../themes";

// notebookTutorial

const Notebook = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>What is a notebook?</h4>
    Notebooks <b>organize thoughts</b> by categories such as: projects, teams,
    clients or whatever suits you best.
    <br />
    <br />
    <b>Step 1: Start a new notebook </b> by clicking on the add a notebook
    button
    <br />
    <br />
    <img src={Images.notebookTutorial} alt="Add notebook button" />
    <br />
    <br />
    <b>Step 2: Name your notebook. </b> Give your channel a name and click
    create
    <br />
    <br />
    <img src={Images.notebookTutorialModal} alt="Add notebook button" />
    <br />
    <br />
    <b>Step 3: Voila! </b> You have been automatically navigated to your new
    notebook. Now add a thread!
    <br />
    <br />
    <img src={Images.addedNotebookTutorial} alt="Add notebook button" />
  </div>
);

Notebook.propTypes = {};

Notebook.defaultProps = {};

export default Notebook;
