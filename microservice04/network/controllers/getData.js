const {
  buildnetworkOptions,
} = require("../utils/lib/buildFunctions/dataBuild");
const { getJsonFromFile } = require("../utils/lib/csv/reader");
const {
  readChart,
  readDemo,
  readDemos,
  FindMycharts,
} = require("../utils/lib/mongodb");
/**
 * GetDataAndBuild - contoller  get data of a  chart build them and send them'
 */
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
/**
 * GetDemo - controller 'get the demo data to display'
 */
exports.GetDemo = (req, res, next) => {
  const id = req.params.id;
  readDemo(id)
    .then((data) => {
      const jsonData = getJsonFromFile(data.filename);
      const network = buildnetworkOptions(jsonData);
      res.status(200).json({ network });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};
/**
 * getDemos - controlerr get the name of demo.csv
 */
exports.getDemos = (req, res, next) => {
  readDemos()
    .then((files) => {
      res.status(200).json({ files });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
/**
 * getMydiagrams -controller user get his charts and the data build
 * so we will display in angular forntend
 */
exports.getMydiagrams = (req, res, next) => {
  const owner = "victoras";
  FindMycharts(owner)
    .then((charts) => {
      charts.forEach((c) => {
        c.data = buildnetworkOptions(c, false);
        console.log(c);
        c.type = "network";
        c.name = c.data.title.text;
      });

      res.status(200).json({ charts });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};
