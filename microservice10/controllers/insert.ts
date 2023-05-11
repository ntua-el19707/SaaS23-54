import {
  AuthRequest,
  PostLineRequest,
  PostNetworkRequest,
  PostPollarRequest,
} from "../lib/interfaces/Request";
import { Response, NextFunction } from "express";
import {
  insertLineChart,
  insertNetworkChart,
  insertPollarChart,
} from "../lib/mongo";
const PostLine = (req: PostLineRequest, res: Response, next: NextFunction) => {
  const chart = req.body.chart;

  if (req.sub && chart) {
    insertLineChart(chart, req.sub)
      .then(() => {
        res.status(200).json({ msg: "chart  saved" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(401).json({ err: "acess decliend" });
  }
};
const PostNetork = (
  req: PostNetworkRequest,
  res: Response,
  next: NextFunction
) => {
  const chart = req.chart;
  if (req.sub && chart) {
    insertNetworkChart(chart, req.sub)
      .then(() => {
        res.status(200).json({ msg: "chart  saved" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(401).json({ err: "acess decliend" });
  }
};
const PostPollar = (
  req: PostPollarRequest,
  res: Response,
  next: NextFunction
) => {
  const chart = req.chart;
  if (req.sub && chart) {
    insertPollarChart(chart, req.sub)
      .then(() => {
        res.status(200).json({ msg: "chart  saved" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(401).json({ err: "acess decliend" });
  }
};
export { PostLine, PostNetork, PostPollar };
