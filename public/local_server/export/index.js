const path = require("path");
const pdf = require("html-pdf");
const jsonfile = require("jsonfile");
const fs = require("fs");

const pdfpath = pdfName => path.join(__dirname, "..", "data", `${pdfName}.pdf`);
const mdpath = pdfName => path.join(__dirname, "..", "data", `${pdfName}.md`);

exports.genExportToMD = (event, md, pdfname) => {
  fs.writeFile(mdpath(pdfname), md, err => {
    if (err) {
      console.error("COULD NOT WRITE MARKDOWN FILE :( ", err);
      return;
    }
    event.sender.send("success-md", "success converting to md");
  });
};

exports.genExportCurrentDocument = (event, html, pdfName) => {
  const writePath = mdpath(pdfName.replace(/\s+/g, ""));
  console.log("write path is ", writePath);

  jsonfile.writeFile(writePath, html, err => {
    if (err) {
      console.error("Directory exists. Could not save workspace", err);
    }
    // event.sender.send("save-workspace-notification", userSelectedDir);
    event.sender.send("save-exported-doc", "success saving exported doc");
  });
};

// exports.genExportCurrentDocument = (event, html, pdfName) => {
// pdf.create(html).toFile(pdfpath(pdfName.replace(/\s+/g, "")), (err, res) => {
// if (err) return console.log(err);
// event.sender.send("save-exported-doc", "success saving exported doc");
// return res;
// });
// };
