const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const auth_server = process.env.auth_service;
  const jwt = req.headers.authorization;
  console.log(auth_server);
  axios.defaults.headers.common["authorization"] = jwt;
  console.log(jwt);
  axios
    .get(`${auth_server}/api_user/services/Diagrams/getUser`)
    .then((response) => {
      const user = response.data.user;
      console.log(user);

      req.sub = user;
      const redis = new Redis({
        host:  process.env.Base_Url, // the service name defined in the docker-compose.yml file
        port: 6379, // the mapped port
      });
      // Retrieve the value
      console.log(`${user}Credits`);
      redis.get(`${user}Credits`, (err, value) => {
        if (err) {
          res.status(400).json({ err });
        } else if (value === null) {
          res.status(400).json({
            errmsg: "something  went wrong in the procees  try again ",
          });
        } else {
          if (value > 0) {
            req.credits = value;
            console.log(`You have ${value} credits`);
            next();
          } else {
            res.status(200).json({
              msg: "You have not enough credits to purchase a diagram",
            });
          }
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).json({ error });
    });
};
