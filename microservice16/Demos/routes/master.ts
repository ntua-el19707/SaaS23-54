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

const MasterRouter = Router();

//Download Services

MasterRouter.route("/download/:filename").get(downloadController);

//Get Services

MasterRouter.route("/getDependancyWheel").get(getDependancyWheel);
MasterRouter.route("/getPolar").get(getPolar);
MasterRouter.route("/getLinewithAnnotations").get(getLinewithAnnotations);
MasterRouter.route("/getNetwork").get(getNetwork);
MasterRouter.route("/getLine").get(getLine);
MasterRouter.route("/getColumn").get(getNetwork);

export { MasterRouter };
