const { buildLineOptions } = require("../utils/lib/buildFunctions/dataBuild");
const { getJsonFromFile } = require("../utils/lib/csv/reader");
const {
  readChart,
  readDemo,
  readDemos,
  FindMycharts,
} = require("../utils/lib/mongodb");

exports.GetDataAndBuild = (req, res, next) => {
  const id = req.params.id;
  readChart(id)
    .then((data) => {
      const line = buildLineOptions(data);
      res.status(200).json({ line: line });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
exports.GetDemo = (req, res, next) => {
  const id = req.params.id;
  readDemo(id)
    .then((data) => {
      const jsonData = getJsonFromFile(data.filename);
      const line = buildLineOptions(jsonData);
      res.status(200).json({ line: line });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
exports.getDemos = (req, res, next) => {
  readDemos()
    .then((files) => {
      res.status(200).json({ files });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
exports.getMydiagrams = (req, res, next) => {
  const owner = "victoras";
  FindMycharts(owner)
    .then((charts) => {
      charts.forEach((c) => {
        c.data = buildLineOptions(c);
        c.type = "Line";
        c.name = c.data.title.text;
      });

      res.status(200).json({ charts });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
