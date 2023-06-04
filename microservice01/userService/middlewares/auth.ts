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
  console.log(token);
  if (token) {
    try {
      const user = verifyJWT(token);
      const user_id = user.user_id;
      const exp = user.exp;
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
            RamTokkens(user_id, exp)
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
      const user = verifyJWT(token);
      req.sub = user.user_id;
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
function RamTokkens(user_id: string, exp: number): Promise<void> {
  return new Promise((resolve, reject) => {
    tokkens(user_id)
      .then(async (tokkens) => {
        const redis = new Redis({
          host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
          port: 6379, // the mapped port
        });

        const expiration = exp - Math.floor(Date.now() / 1000); // Calculate remaining seconds until token expiration

        setKeyWithExpiration(`${user_id}Credits`, tokkens, expiration, redis)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export { customauthCredits, customauthNocredits };
async function setKeyWithExpiration(
  key: string,
  value: number,
  seconds: number,
  redis: Redis
) {
  await redis.set(key, value);
  await redis.expire(key, Math.ceil(seconds));
}
