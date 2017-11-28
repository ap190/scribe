const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");

const jsonpath = path.join(__dirname, "..", "data", "workspace.json");

exports.genSaveWorkspace = (event, workspace) => {
  jsonfile.writeFile(jsonpath, workspace, { spaces: 4 }, (err, data) => {
    if (err) {
      throw new Error("Could not save workspace");
    }
    event.sender.send("save-workspace-res", data);
  });
};
