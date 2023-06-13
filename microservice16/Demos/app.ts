import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { MasterRouter } from "./routes/master";

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
app.use("/api_Demos", MasterRouter);
app.use("/*", (req, res, next) => {
  res.status(404).json({ errmsg: "Resource not  found" });
});

export default app;
