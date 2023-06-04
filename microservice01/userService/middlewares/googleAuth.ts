import { Response, NextFunction } from "express";
import { validateGoogleToken } from "../utils/googleauth";
import { AuthRequest } from "../utils/interfaces/AuthRequest";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.body.authorization;
  if (token) {
    const validation = validateGoogleToken(token);
    validation
      .then((rsp) => {
        if (rsp.valid) {
          req.sub = rsp.userEmail;

          next();
        } else {
          res.status(401).json({ errmsg: "Access Denied" });
        }
      })
      .catch((err) => {
        res.status(401).json({ errmsg: "Access Denied" });
      });
  } else {
    res.status(401).json({ errmsg: "you have not provided login jwt" });
  }
};

export { auth };
