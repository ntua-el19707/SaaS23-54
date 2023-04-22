const {
  createChart,
  svgChart,
  pdfChart,
  createHtml,
} = require("../utils/lib/chartLine/pngLine");
const { readChart } = require("../utils/lib/mongodb");
const fs = require("fs");
const path = require("path");
exports.DownloadPng = (req, res, next) => {
  const id = req.params.id;

  readChart(id)
    .then((data) => {
      createChart(data)
        .then((img) => {
          var image = Buffer.from(img, "base64");

          res.type("png");
          res.send(image);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.DownloadSvg = (req, res, next) => {
  const id = req.params.id;
  readChart(id)
    .then((data) => {
      svgChart(data)
        .then((svg) => {
          res.sendFile(path.join(__dirname, "../", svg), function (err) {
            if (err) {
              console.log(err); // Check error if you want
            }
            fs.unlink(path.join(__dirname, "../", svg), function () {
              console.log("File was deleted"); // Callback
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.DonwloadPdf = (req, res, next) => {
  const id = req.params.id;
  readChart(id)
    .then((data) => {
      pdfChart(data)
        .then((pdf) => {
          res.sendFile(path.join(__dirname, "../", pdf), function (err) {
            if (err) {
              console.log(err); // Check error if you want
            }
            fs.unlink(path.join(__dirname, "../", pdf), function () {
              console.log("File was deleted"); // Callback
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.Donwloadhtml = (req, res, next) => {
  const id = req.params.id;
  readChart(id)
    .then((data) => {
      createHtml(data)
        .then((html) => {
          const pathhtml = path.join(__dirname, "../", html);

          res.sendFile(pathhtml, function (err) {
            if (err) {
              console.log(err); // Check error if you want
            }
            fs.unlink(pathhtml, function () {
              //onsole.log("File was deleted"); // Callback
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.DonwloadCsv = (req, res, next) => {
  const file = req.param.file;
  const pathCsv = path.join(__dirname, "../utils/File/CSV/", file);
  res.sendFile(pathCsv);
};
