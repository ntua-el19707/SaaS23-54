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

/** Controller to download the html file of a chart */
export const downloadhtmlController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Send the html file to the client
  if (req.File_id) {
    console.log(req.File_id);
    console.log(__dirname);
    const filepath = path.join(
      __dirname,
      `../utils/Files/html/${req.File_id}.html`
    );
    res.sendFile(filepath, function (err) {});
  } else {
    res.status(400).json({ err: "not fileid" });
  }
};
