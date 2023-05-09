import { Router } from "express";
import {
  downloadpngController,
  findChartMiddleware,
} from "../controllers/donwload";

const DonwloadRouter = Router();

DonwloadRouter.get("/getpng/:id", findChartMiddleware, downloadpngController);

export { DonwloadRouter };
