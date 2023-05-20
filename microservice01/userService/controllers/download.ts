import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
dotenv.config();
function DonwloadPng(req: AuthRequest, res: Response, next: NextFunction) {
  // Define the request configuration
  console.log("one");
  const downloadService: string | undefined = process.env.DOWNLOADPNGSERVICE;
  const id: string = req.params.id;
  if (downloadService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${downloadService}/getpng/${id}`,
      headers: req.headers,
      data: req.body,

      responseType: "blob",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed

        res.setHeader(
          "Content-disposition",
          "attachment; filename=filename.png"
        );
        res.setHeader("Content-type", "image/png");
        response.data.pipe(res);
      })
      .catch((error) => {
        // Handle any errors if necessary
        res.status(400).json({ err: error });
      });
  }
}
function DonwloadHtml(req: AuthRequest, res: Response, next: NextFunction) {
  // Define the request configuration
  const downloadService: string | undefined = process.env.DOWNLOADHTMLSERVICE;
  const id: string = req.params.id;
  if (downloadService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${downloadService}/gethtml/${id}`,
      headers: req.headers,
      data: req.body,
      responseType: "blob",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        res.setHeader(
          "Content-disposition",
          `attachment; filename=filename.html`
        );
        res.setHeader("Content-type", "text/html");

        // Pipe the response blob from the external service to the response in the orchestrator
        response.data.pipe(res);
      })
      .catch((error) => {
        // Handle any errors if necessary
        res.status(400).json({ err: error });
      });
  }
}

function DonwloadPdf(req: AuthRequest, res: Response, next: NextFunction) {
  // Define the request configuration
  const downloadService: string | undefined = process.env.DOWNLOADPDFSERVICE;
  const id: string = req.params.id;
  if (downloadService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${downloadService}/getpdf/${id}`,
      headers: req.headers,
      data: req.body,

      responseType: "blob",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        res.setHeader(
          "Content-disposition",
          `attachment; filename=filename.pdf`
        );
        res.setHeader("Content-type", "application/pdf");

        // Pipe the response blob from the external service to the response in the orchestrator
        response.data.pipe(res);
      })
      .catch((error) => {
        // Handle any errors if necessary
        res.status(400).json({ err: error });
      });
  }
}

function DonwloadSvg(req: AuthRequest, res: Response, next: NextFunction) {
  // Define the request configuration
  const downloadService: string | undefined = process.env.DOWNLOADSVGSERVICE;
  const id: string = req.params.id;
  if (downloadService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${downloadService}/getsvg/${id}`,
      headers: req.headers,
      data: req.body,

      responseType: "blob",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        res.setHeader(
          "Content-disposition",
          `attachment; filename=filename.svg`
        );
        res.setHeader("Content-type", "image/svg+xml");

        // Pipe the response blob from the external service to the response in the orchestrator
        response.data.pipe(res);
      })
      .catch((error) => {
        // Handle any errors if necessary
        res.status(400).json({ err: error });
      });
  }
}

export { DonwloadHtml, DonwloadPdf, DonwloadSvg, DonwloadPng };
