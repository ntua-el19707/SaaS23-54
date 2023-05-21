const { UpdateApis } = require("../utils/lib/Producers.js/Producers");
const { buildAll } = require("../utils/lib/chartnetwork/network");
const { getJsonFromFile, destroy } = require("../utils/lib/csv/reader");
const { makeid } = require("../utils/lib/genaratorString");
const { validateInput } = require("../utils/lib/valodators/validators");
const Redis = require("ioredis");
require("dotenv").config();

/**
 * saveDB - controller save data in DB and the delete the csv
 */
exports.saveDB = (req, res, next) => {
  const file = req.body.file;
  if (file) {
    try {
      const data = getJsonFromFile(file); // get data from csv  ;

      if (validateInput(data)) {
        const owner = req.sub;
        console.log("here" + owner);
        buildAll(data)
          .then((file) => {
            console.log(file);
            const id = makeid(8);
            console.log(`files  build`);
            const redis = new Redis({
              host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
              port: 6379, // the mapped port
            });
            // Retrieve the value

            redis.set(`${req.sub}Credits`, --req.credits);
            UpdateApis(file, req.sub, data, id)
              .then((respapis) => {
                res.status(200).json({ msg: `purchased diagram ${id} ` });
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
