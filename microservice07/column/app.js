/**
 * module app 'export an express server'
 */
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var corsOptions = {
  origin: "http://127.0.0.1:4200", // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//initializations
//initialization for our express backend
app.use(cors(corsOptions));

//import routes
const api_column = require("./routes/master");
const { consumeFile } = require("./utils/lib/consumer");
//set up routers
consumeFile();
app.get("/", (req, res, next) => {

  res.send("ok");
});
app.use("/api_column", api_column);
//set up 404
app.use("/*", (req, res, next) => {
  res.status(404).json({ errmsg: "Resource not  found" });
});

module.exports = app;
