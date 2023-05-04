const { readChart, findChart } = require("../utils/lib/mongodb");
const fs = require("fs");
const path = require("path");

/**middleware for all
 * FindChart
 */
exports.findChart = (req, res, next) => {
  const id = req.params.id;

  const db = reaturnDB(id);
  console.log(db);
  //* i can also get the preview id from frontend if i wish
  //? so why not download file  directly  and i search mongoDB
  // & Beacuse in the future  i will also implement Onwner Ship in Donwload files and second  to make sure  the file_id  is always
  // & correct so if i get wrong  id  i know  there is not sush a file in our files
  findChart(db, id)
    .then((rsp) => {
      if (rsp !== null) {
        req.File_id = rsp; //later i will add if a file and chart exist (Purchased)  is not exist to send request to the build sevice to create them
        next();
      } else {
        res
          .status(400)
          .json({ errmsg: "The is not a  chart register with requested id" });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    }); //impment latare  promsie
};
/*
DownloadPng - controller 'downolad the png of a chart'
*/
exports.DownloadPng = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../utils/Files/png", `${req.File_id}.png`),
    function (err) {}
  );
};
/**
DownloadSvg - controller 'download  svg  chart'
*/
exports.DownloadSvg = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../utils/Files/svg", `${req.File_id}.svg`),
    function (err) {}
  );
};
/**
DownloadPdf - controller 'download the pdf of a chart'
*/
exports.DonwloadPdf = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../utils/Files/pdf", `${req.File_id}.pdf`),
    function (err) {}
  );
};
/**
Downloadhtml - controller 'download the html of a chart'
*/
exports.Donwloadhtml = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../utils/Files/html", `${req.File_id}.html`),
    function (err) {}
  );
};
/**
 * DownloadCsv - download the csv file of the chart demo
 */
exports.DonwloadCsv = (req, res, next) => {
  const file = req.param.file;
  const pathCsv = path.join(__dirname, "../utils/File/CSV/", file);
  res.sendFile(pathCsv);
};
function reaturnDB(id) {
  console.log(id);
  const size = id.length;
  let db = null;
  switch (size) {
    case 5:
      //line  anottation
      break;
    case 6:
      //for collum
      break;
    case 7:
      db = {
        db: "Lines",
        collection: "ChartLine",
      };
      break;
    case 8:
      db = {
        db: "network",
        collection: "chartnetwork",
      };

      break;
    case 9:
      db = {
        db: "Pollar",
        collection: "chartPollar",
      };
      break;
    case 10:
      db = {
        db: "DependancyWheel",
        collection: "chartDependancyWheel",
      };
      break;
    default:
      break;
  }
  return db;
}
