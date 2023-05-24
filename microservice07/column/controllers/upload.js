

const { validateInput } = require("../utils/lib/valodators/validators");

require("dotenv").config();

const { makeid } = require("../utils/lib/genaratorString");
const Redis = require("ioredis");
const { UpdateApis } = require("../utils/lib/Producers.js/Producers");
const { buildAll } = require("../utils/lib/chartcolumn/column");
const { getJsonFromFile } = require("../utils/lib/csv/reader1");
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
            //now charts  have build 2 thing  chaerge  and save  db
            const id = makeid(11);
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
          // .catch((err) => {
          //   console.log(err);
          //TODO delete it failed purchase
          //  res.status(400).json({ err });
          // });
          //  / res.status(200).json({ rsp });

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
