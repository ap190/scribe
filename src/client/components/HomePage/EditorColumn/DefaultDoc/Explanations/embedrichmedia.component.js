import React from "react";
import { Images } from "../../../../../themes";

const EmbedRichMedia = () => (
  <div className="explanation">
    <h4 style={{ marginTop: "0px" }}>
      How do I embed rich media into my document?
    </h4>
    Scribe supports numerous media types like stack overflow links, quora links,
    youtube videos, wikipedia entries and more{" "}
    <b>Lets embed rich media together</b>.
    <br />
    <br />
    <b>Step 1: Navigate to a document</b> Drop a new line and click the "plus"
    button.
    <br />
    <br />
    <img src={Images.createDocument} alt="Create a document" />
    <br />
    <br />
    <b>Step 2: Select the link icon </b> and paste the URL for the desired
    content.
    <br />
    <br />
    <img src={Images.createDocumentHighlightText} alt="Format text" />
    <br />
    <br />
    <b>Step 3: Enjoy your embedded content! </b>
  </div>
);

EmbedRichMedia.propTypes = {};

EmbedRichMedia.defaultProps = {};

export default EmbedRichMedia;
