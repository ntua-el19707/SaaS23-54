const { buildAll } = require("../utils/lib/chartLine/pngLine");
const { getJsonFromFile } = require("../utils/lib/csv/reader");
const { validateInput } = require("../utils/lib/valodators/validators");
const { insertChart } = require("../utils/lib/mongodb");
require("dotenv").config();
const axios = require("axios");
const {
  UpdateApis,
  RequestData,
} = require("../utils/lib/axiosDservices/upload");
const { makeid } = require("../utils/lib/genaratorString");
exports.saveDB = (req, res, next) => {
  const file = req.body.file;

  if (file) {
    console.log(file);
    RequestData(file, req.headers.authorization)
      .then((d) => {
        try {
          const data = getJsonFromFile(d);
          console.log(data);
          if (validateInput(data)) {
            const owner = req.sub;
            buildAll(data)
              .then((file) => {
                //now charts  have build 2 thing  chaerge  and save  db
                console.log("one");
                const auth_server = process.env.auth_service;
                const jwt = req.headers.authorization;
                const id = makeid(7);
                console.log(auth_server);
                //  axios.defaults.headers.common["authorization"] = jwt;
                //  axios
                //   .post(`${auth_server}/api_user/Purchase/${id}`)
                // .then((resp) => {
                //      console.log(resp);
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
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(404).json({ errmsg: "You have not provide the filename" });
  }
};
