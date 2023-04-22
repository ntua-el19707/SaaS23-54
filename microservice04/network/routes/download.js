const { Router } = require("express");
//donwload routes and get data
const {
  DownloadPng,
  DownloadSvg,
  DonwloadPdf,
  Donwloadhtml,
} = require("../controllers/download");
const { getMydiagrams } = require("../controllers/getData");
const router = Router();
router.get("/getPng/:id", DownloadPng);
router.get("/getSvg/:id", DownloadSvg);
router.get("/getPdf/:id", DonwloadPdf);
router.get("/getHtml/:id", Donwloadhtml);
router.get("/getDiagrams", getMydiagrams);
module.exports = router;
