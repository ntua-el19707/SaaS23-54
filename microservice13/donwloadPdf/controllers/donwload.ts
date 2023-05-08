import { AuthRequest } from "../utils/interfaces/Request";
import { downloadDocs } from "../utils/interfaces/docs";
import { findChart } from "../utils/lib/mongodb";
import { Response, NextFunction } from "express";

import path from "path";

/** Middleware to find a chart based on its ID */
export const findChartMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  // Search for the chart in the MongoDB database
  findChart(id)
    .then((rsp: downloadDocs) => {
      if (req.sub) {
        if (rsp.ownerShip === req.sub) {
          console.log(rsp);
          req.File_id = rsp.file;
          next();
        } else {
          res.status(403).json({ err: "you have not this  chart ownership" });
        }
      } else {
        res.status(401).json({ err: "user not authenticated" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};

/** Controller to download the Pdf file of a chart */
export const downloadPdfController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Send the Pdf file to the client
  res.sendFile(
    path.join(__dirname, "../utils/Files/Pdf", `${req.File_id}`),
    function (err) {}
  );
};
