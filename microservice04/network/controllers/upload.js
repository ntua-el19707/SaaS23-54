const { buildAll } = require("../utils/lib/chartnetwork/network");
const { getJsonFromFile, destroy } = require("../utils/lib/csv/reader");
const { insertChart } = require("../utils/lib/mongodb");
const { validateInput } = require("../utils/lib/valodators/validators");

/**
 * saveDB - controller save data in DB and the delete the csv
 */
exports.saveDB = (req, res, next) => {
  const file = req.body.file;
  if (file) {
    try {
      const data = getJsonFromFile(file); // get data from csv  ;
      //   destroy(file);
      //console.log(validateInput(data));
      if (/*validateInput(data)*/ true) {
        const owner = "victoras";
        buildAll(data)
          .then((file) => {
            //now charts  have build 2 thing  chaerge  and save  db
            insertChart(data, owner, file)
              .then((rsp) => {
                res.status(200).json({ rsp });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ err });
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(400).json({ errmsg: "not valid input" });
      }
    } catch (err) {
      console.log(err);
      destroy(file);
      res.status(400).json({ errmsg: "not valid input" });
    }
  } else {
    res.status(404).json({ errmsg: "You have not provide the filename" });
  }
};
