import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
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
import { router } from "./routes/master";
import { consumeFile } from "./utils/lib/consumer";
//set up routers
consumeFile();
app.get("/", (req, res, next) => {
  res.send("ok");
});
app.use("/api_DonloadPng", router);
//set up 404
app.use("/*", (req, res, next) => {
  res.status(404).json({ errmsg: "Resource not  found" });
});

export default app;
