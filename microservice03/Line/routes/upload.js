const { Router } = require("express");
var pathM = require("path");
const router = Router();
var multer = require("multer");
const path = "utils/Files/CSV";

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, path);
  },
  filename: function (request, file, callback) {
    const filename = "LinesChart" + "_" + makeid(5) + ".csv";
    request.MultFilesB.push(filename);
    callback(null, filename);
  },
});

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
const { uploadPost, saveDB } = require("../controllers/upload");
const makeid = require("../utils/lib/genaratorString");
const {
  DownloadPng,
  DownloadSvg,
  DonwloadPdf,
  Donwloadhtml,
} = require("../controllers/download");
const { getMydiagrams } = require("../controllers/getData");

router.post(
  "/upload",
  (req, res, next) => {
    req.MultFilesB = [];
    next();
  },
  upload.single("file"),
  uploadPost
);
router.post("/confirm", saveDB);

router.get("/getPng/:id", DownloadPng);
router.get("/getSvg/:id", DownloadSvg);
router.get("/getPdf/:id", DonwloadPdf);
router.get("/getHtml/:id", Donwloadhtml);
router.get("/getDiagrams", getMydiagrams);
module.exports = router;
