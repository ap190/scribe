import React from "react";
import { Images } from "../../../../../themes";

const CreateDoc = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>What is a document?</h4>
    Dcouments contain all notes relevant to a{" "}
    <b>specific notebook and thread.</b> Creating a notebook is simple using our
    Medium inspired editor <b>Lets create a document together</b>.
    <br />
    <br />
    <b>Step 1: Select a notebook and thread</b> Start your document by setting a
    title.
    <br />
    <br />
    <img src={Images.createDocument} alt="Create a document" />
    <br />
    <br />
    <b>Step 2: Start typing! </b> We can easily format text by highlighting it.
    <br />
    <br />
    <img src={Images.createDocumentHighlightText} alt="Format text" />
    <br />
    <br />
    <b>Step 3: Click on + button </b> Start a new line and click on the "plus"
    button. Add an image, code block, line separator or embed helpful linka.
    <br />
    <br />
    <img src={Images.createDocumentAddButton} alt="Add button for document" />
    <br />
    <br />
    <b>Step 4: Add an Image </b> Click on the image icon
    <br />
    <br />
    <img src={Images.createDocumentAddExpanded} alt="Add button expanded" />
    <br />
    <br />
    <b>Step 5: Select an image or gif to be added </b>
    <br />
    <br />
    <img src={Images.createDocumentAddedImage} alt="Added gif" />
  </div>
);

CreateDoc.propTypes = {};

CreateDoc.defaultProps = {};

export default CreateDoc;
