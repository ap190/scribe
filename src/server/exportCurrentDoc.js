const path = require("path");
const pdf = require("html-pdf");

const pdfpath = pdfName => path.join(__dirname, "..", "data", `${pdfName}.pdf`);

exports.genExportCurrentDocument = (event, html, pdfName) => {
  pdf.create(html).toFile(pdfpath(pdfName.trim()), (err, res) => {
    if (err) return console.log(err);
    event.sender.send("save-exported-doc", "success saving exported doc");
    return res;
  });
};
