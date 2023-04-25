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
  origin: "http://127.0.0.1:4200", // Frontent
};
//initializations
//initialization for our express backend
app.use(cors(corsOptions));

//import routes
const api_upload = require("./routes/master");
//set up routers
app.get("/", (req, res, next) => {
  res.send("ok");
});
//this will  be expose to fronend
app.use("/api_upload", api_upload);
//set up 404
app.use("/*", (req, res, next) => {
  res.status(404).json({ errmsg: "Resource not  found" });
});

module.exports = app;
