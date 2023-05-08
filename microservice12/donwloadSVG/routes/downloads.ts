import { Router } from "express";
import {
  downloadSvgController,
  findChartMiddleware,
} from "../controllers/donwload";

const DonwloadRouter = Router();

DonwloadRouter.get("/getSvg/:id", findChartMiddleware, downloadSvgController);

export { DonwloadRouter };
