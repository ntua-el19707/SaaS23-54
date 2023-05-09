import { Router } from "express";
import {
  downloadhtmlController,
  findChartMiddleware,
} from "../controllers/donwload";

const DonwloadRouter = Router();

DonwloadRouter.get("/gethtml/:id", findChartMiddleware, downloadhtmlController);

export { DonwloadRouter };
