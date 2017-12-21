const electron = require("electron");
const path = require("path");

const userDataPath = (electron.app || electron.remote.app).getPath("userData");
exports.getScribeImgPath = imgID => path.join(userDataPath, "img", imgID);
