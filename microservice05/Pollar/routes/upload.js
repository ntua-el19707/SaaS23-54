const { Router } = require("express");
const router = Router();
var multer = require("multer"); //use for  upload
const { uploadPost, saveDB } = require("../controllers/upload");
const makeid = require("../utils/lib/genaratorString");
const path = "utils/Files/CSV";
//set storage to store the files
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, path);
  },
  filename: function (request, file, callback) {
    const filename = "PollarChart" + "_" + makeid(5) + ".csv";
    request.MultFilesB.push(filename);
    callback(null, filename);
  },
});
//uplaod file set limit  only csv files
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
    if (file.mimetype == "text/csv") {
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
    req.MultFilesB = [];
    next();
  },
  upload.single("file"),
  uploadPost
);
//confirm route
router.post("/confirm", saveDB);
module.exports = router
