const { validateInput } = require("../utils/lib/valodators/validators");

require("dotenv").config();

const { makeid } = require("../utils/lib/genaratorString");
const Redis = require("ioredis");
const { UpdateApis } = require("../utils/lib/Producers.js/Producers");
const { buildAll } = require("../utils/lib/chartcolumn/column");
const { getJsonFromFile } = require("../utils/lib/csv/reader1");
const { buildColumnOptions } = require("../utils/lib/buildFunctions/dataBuild");

exports.saveDB = (req, res, next) => {
  const file = req.body.file;

  if (file) {
    console.log(file);

    try {
      getJsonFromFile(file)
        .then((data) => {
          console.log(data);
          data = JSON.parse(data);
          const collumnData = buildColumnOptions(data);

          const series = collumnData.series;
          const rsp = {
            rsp: {
              collumnData,
              series,
            },
          };
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
                let data2 = data;
                console.log(collumnData);
                UpdateApis(file.file, req.sub, data, id, series)
                  .then((respapis) => {
                    let rsp = {
                      chart: {
                        chart: collumnData.chart,
                      },
                      type: "Collumn",
                    };
                    if (collumnData.chart.xAxis) {
                      rsp.chart.xAXis = collumnData.chart.xAxis;
                    }
                    if (collumnData.chart.yAxis) {
                      rsp.chart.yAXis = collumnData.chart.yAxis;
                    }
                    if (collumnData.chart.title) {
                      rsp.chart.title = collumnData.chart.title;
                    }
                    if (collumnData.chart.subtitle) {
                      rsp.chart.subtitle = collumnData.chart.subtitle;
                    }
                    res
                      .status(200)
                      .json({ rsp: { chart: collumnData, type: "Collumn" } });
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
        })
        .catch((err) => {
          res.status(400).json({ errmsg: "not valid input" });
        });
    } catch (err) {
      console.log(err);
      destroy(file);
      res.status(400).json({ errmsg: "not valid input" });
    }
  } else {
    res.status(404).json({ errmsg: "You have not provide the filename" });
  }
};
