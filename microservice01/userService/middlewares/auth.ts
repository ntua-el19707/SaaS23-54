import { Response, NextFunction } from "express";
import Redis from "ioredis";
import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { verifyJWT } from "../utils/Gennarator.JWT";
import {
  ExpiredTokken,
  JwtWrongFormat,
  VerrificationError,
} from "../utils/error";
import { FindUserByUser_id } from "../utils/mongo";
const customauthCredits = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user_id = verifyJWT(token);
      req.sub = user_id;

      const redis = new Redis({
        host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
        port: 6379, // the mapped port
      });
      // Retrieve the value
      console.log(`${user_id}Credits`);
      redis.get(`${user_id}Credits`, (err, value) => {
        if (err) {
          console.error(err);
          res.status(400).json({ err });
        } else {
          if (value === null) {
            RamTokkens(user_id)
              .then(() => {
                console.log("insert tokkens  in Ram");
                next();
              })
              .catch((err) => {
                res.status(400).json({ err });
              });
          } else {
            next();
          }
        }
      });
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
const customauthNocredits = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
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
function tokkens(user_id: string): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log(user_id);
    FindUserByUser_id(user_id)
      .then((user) => {
        resolve(user.credits);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function RamTokkens(user_id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    tokkens(user_id)
      .then((tokkens) => {
        const redis = new Redis({
          host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
          port: 6379, // the mapped port
        });
        redis.set(`${user_id}Credits`, tokkens);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export { customauthCredits, customauthNocredits };
