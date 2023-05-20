import { Response, NextFunction } from "express";

import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { verifyJWT } from "../utils/Gennarator.JWT";
import {
  ExpiredTokken,
  JwtWrongFormat,
  VerrificationError,
} from "../utils/error";
const customauth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user_id = verifyJWT(token);
      req.sub = user_id;
      next();
    } catch (err) {
      if (err instanceof ExpiredTokken) {
        res.status(401).json({ errmsg: "Token expired" });
      } else if (err instanceof VerrificationError) {
        res.status(401).json({ errmsg: "Verification failed" });
      } else if (err instanceof JwtWrongFormat) {
        res.status(401).json({ errmsg: "JWT has wrong format" });
      } else {
        res.status(401).json({ errmsg: err });
      }
    }
  } else {
    res.status(401).json({ errmsg: "you have not provided login jwt" });
  }
};
export { customauth };
