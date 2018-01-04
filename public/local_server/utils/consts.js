const fs = require("fs");
const electron = require("electron");
const path = require("path");

const userDataPath = (electron.app || electron.remote.app).getPath("userData");
exports.scribeImgDir = path.join(userDataPath, "img");
exports.userDataPath = userDataPath;
