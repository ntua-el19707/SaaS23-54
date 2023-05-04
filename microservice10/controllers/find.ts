import { FindCharts, findSpecific } from "../lib/mongo";
import { Request, Response, NextFunction } from "express";
const find = (req: Request, res: Response, next: NextFunction) => {
  FindCharts("victoras")
    .then((rsp) => {
      res.status(200).json({ charts: rsp });
    })
    .catch((err) => {
      res.send(err);
    });
};
const findSpecificAndBuild = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id; //get the  id  of  a chart
  findSpecific(id)
    .then((rsp) => {
      res.status(200).json({ chart: rsp });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
export { find, findSpecificAndBuild };
