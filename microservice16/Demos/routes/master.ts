import { NextFunction, Router } from "express";

import {
  getDependancyWheel,
  getPolar,
  getLinewithAnnotations,
  getNetwork,
  getLine,
  getColumn,
} from "../controllers/demoBuild";

import { downloadController } from "../controllers/downloader";
import { master } from "../controllers/insertDemos";

const MasterRouter = Router();

//Download Services

MasterRouter.route("/downloadDependancyWheel/:filename").get(
  downloadController
);
MasterRouter.route("/downloadPolar/:filename").get(downloadController);
MasterRouter.route("/downloadLinewithAnnotations/:filename").get(
  downloadController
);
MasterRouter.route("/downloadNetwork/:filename").get(downloadController);
MasterRouter.route("/downloadLine/:filename").get(downloadController);
MasterRouter.route("/downloadColumn/:filename").get(downloadController);

//Get Services

MasterRouter.route("/getDependancyWheel").get(getDependancyWheel);
MasterRouter.route("/getPolar").get(getPolar);
MasterRouter.route("/getLinewithAnnotations").get(getLinewithAnnotations);
MasterRouter.route("/getNetwork").get(getNetwork);
MasterRouter.route("/getLine").get(getLine);
MasterRouter.route("/getColumn").get(getNetwork);

// MasterRoute -
MasterRouter.post("/Master", master);
MasterRouter.get("/Master", (req, res) => {
  res.send("ok");
});
export { MasterRouter };
