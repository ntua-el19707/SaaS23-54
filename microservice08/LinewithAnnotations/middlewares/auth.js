const axios = require("axios");

require("dotenv").config();

exports.auth = (req, res, next) => {
  const auth_server = process.env.auth_service;
  const jwt = req.headers.authorization;
  console.log(auth_server);
  axios.defaults.headers.common["authorization"] = jwt;
  console.log(jwt);
  axios
    .get(`${auth_server}/api_user/user`)
    .then((response) => {
      const user = response.data.user;
      console.log(user);
      if (user.credits > 0) {
        req.sub = user.user_id;
        next();
      } else {
        res.status(400).json({ errmg: "you have not credits" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).json({ error });
    });
};
