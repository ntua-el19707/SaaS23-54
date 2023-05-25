const { buildAll } = require("../utils/lib/chartLine/pngLine");
const { getJsonFromFile } = require("../utils/lib/csv/reader");
const { validateInput } = require("../utils/lib/valodators/validators");
require("dotenv").config();
const { makeid } = require("../utils/lib/genaratorString");
const { UpdateApis } = require("../utils/lib/Producers");
exports.saveDB = (req, res, next) => {
  const file = req.body.file;

  if (file) {
    console.log(file);

    try {
      const data = getJsonFromFile(file);
      console.log(data);
      if (validateInput(data)) {
        buildAll(data)
          .then((file) => {
            console.log(file);
            const id = makeid(10); //dependencywheel
            console.log(`files  bu`);

            // Retrieve the value
            console.log("chart id");
            //     redis.set(`${req.sub}Credits`, --req.credits);
            console.log("charge ram");
            UpdateApis(file.file, req.sub, data, id)
              .then((respapis) => {
                res.status(200).json({
                  rsp: {
                    chart: file.chart,
                    type: "Network",
                  },
                });
              })
              .catch((err) => {
                console.log("err");
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
