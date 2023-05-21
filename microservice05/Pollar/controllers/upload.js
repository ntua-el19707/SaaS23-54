const { getJsonFromFile, destroy } = require("../utils/lib/csv/reader");
const { validateInput } = require("../utils/lib/valodators/validators");
const { buildAll } = require("../utils/lib/chartPollar/Pollar");
const { makeid } = require("../utils/lib/genaratorString");
const { UpdateApis } = require("../utils/lib/Producers.js/Producers");
require("dotenv").config();
const Redis = require("ioredis");
exports.saveDB = (req, res, next) => {
  const file = req.body.file;
  if (file) {
    try {
      const data = getJsonFromFile(file); // get data from csv  ;
      console.log(data);
      if (validateInput(data)) {
        const owner = req.sub;
        buildAll(data)
          .then((file) => {
            const id = makeid(9);
            //now charts  have build 2 thing  chaerge  and save  db
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
