import { Router, Response, NextFunction } from "express";
import { customauth } from "../../middlewares/auth";
import dotenv from "dotenv";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  DonwloadHtml,
  DonwloadPdf,
  DonwloadPng,
  DonwloadSvg,
} from "../../controllers/download";

const downloadRouter: Router = Router();

downloadRouter.route("/downloadPng/:id").get(DonwloadPng);
downloadRouter.route("/downloadPdf/:id").get(DonwloadPdf);
downloadRouter.route("/downloadSvg/:id").get(DonwloadSvg);
downloadRouter.route("/downloadHtml/:id").get(DonwloadHtml);

export { downloadRouter };
