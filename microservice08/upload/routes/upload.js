const { Router } = require("express");
const router = Router();
var multer = require("multer"); //use for  upload
const { uploadPost, saveDB } = require("../controllers/upload");
const { makeid } = require("../utils/lib/genaratorString");
const path = "utils/Files/CSV";
//set storage to store the files
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, path);
  },
  filename: function (request, file, callback) {
    const filename = "uploadChart" + "_" + makeid(5) + ".csv";
    request.MultFilesB.push(filename);
    callback(null, filename);
  },
});
//uplaod file set limit  only csv files
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
    if (/*file.mimetype == "text/csv"*/ true) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only csv Files"));
    }
  },
});
//upload route
router.post(
  "/upload",
  (req, res, next) => {
    req.MultFilesB = []; //multer will upload file more than once
    next();
  },
  upload.single("file"),
  uploadPost
);

module.exports = router;
