import { Router } from "express";
import {
  downloadPdfController,
  findChartMiddleware,
} from "../controllers/donwload";

const DonwloadRouter = Router();

DonwloadRouter.get("/getPdf/:id", findChartMiddleware, downloadPdfController);

export { DonwloadRouter };
