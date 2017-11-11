const path = require("path");
const fs = require("fs");

function ignore(filepath) {
  return (
    path.basename(filepath) === "node_modules" ||
    path.basename(filepath) === ".git"
  );
}

const getAllFiles = dir =>
  fs
    .readdirSync(dir)
    .reduce(
      (files, file) =>
        fs.statSync(path.join(dir, file)).isDirectory() &&
        !ignore(path.join(dir, file))
          ? files.concat(getAllFiles(path.join(dir, file)))
          : files.concat(path.join(dir, file)),
      []
    );

module.exports = {
  getAllFiles,
  ignore
};
