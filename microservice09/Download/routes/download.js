const { Router } = require("express");
//donwload routes and get data
const {
  DownloadPng,
  DownloadSvg,
  DonwloadPdf,
  Donwloadhtml,
  findChart,
} = require("../controllers/download");

const router = Router();

router.get("/getPng/:id", findChart, DownloadPng);
router.get("/getSvg/:id", findChart, DownloadSvg);
router.get("/getPdf/:id", findChart, DonwloadPdf);
router.get("/getHtml/:id", findChart, Donwloadhtml);
module.exports = router;
