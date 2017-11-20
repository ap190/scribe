const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");

const jsonpath = path.join(__dirname, "..", "data", "channels.json");

exports.genLoadData = event => {
  jsonfile.readFile(jsonpath, "utf8", (err, data) => {
    if (err) {
      throw new Error("failed to read file");
    }
    event.sender.send("load-file-res", data);
  });
};
