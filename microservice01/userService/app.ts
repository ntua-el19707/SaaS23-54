import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/master";
import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.LINESERVICE);
import { Consumers } from "./utils/consumer";
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var corsOptions = {
  origin: "http://127.0.0.1:4200", // some legacy browsers (IE11, various SmartTVs) choke on 204

  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
Consumers();
app.use("/api_user", router);
app.use(
  "/*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({ errmsg: "The is not such  resource" });
  }
);

export default app;
