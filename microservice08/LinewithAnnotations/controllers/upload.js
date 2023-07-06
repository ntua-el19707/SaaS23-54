const { buildAll } = require("../utils/lib/chartLine/pngLine");
const { getJsonFromFile, destroyCSV } = require("../utils/lib/csv/reader");
const { validateInput } = require("../utils/lib/valodators/validators");
const { UpdateApis } = require("../utils/lib/Producers/Producer");
require("dotenv").config();
const Redis = require("ioredis");
const { makeid } = require("../utils/lib/genaratorString");

exports.saveDB = (req, res, next) => {
  const file = req.body.file;

  if (file) {
    console.log(file);

    try {
      let data = getJsonFromFile(file);
      destroyCSV(file);

      console.log(data);
      if (validateInput(data)) {
        //validateInput(data)) {
        const owner = req.sub;
        const data2 = data;

        buildAll(data2)
          .then((file) => {
            //now charts  have build 2 thing  chaerge  and save  db

            const id = makeid(12);
                        const redis = new Redis({
              host:  process.env.Base_Url, // the service name defined in the docker-compose.yml file
              port: 6379, // the mapped port
            });
            // Retrieve the value

            redis.set(`${req.sub}Credits`, --req.credits);

            UpdateApis(file.file, owner, data, id)
              .then(() => {
                res.status(200).json({
                  rsp: {
                    chart: file.chart,
                    type: "Line Annotations",
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
            console.log(err);
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
