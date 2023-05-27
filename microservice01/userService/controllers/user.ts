import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { FindUser, logIn, Register } from "../utils/mongo";
import { user } from "../utils/interfaces/user";
import { issueJWT } from "../utils/Gennarator.JWT";
import Redis from "ioredis";

const Login = (req: AuthRequest, res: Response) => {
  const user: string | undefined = req.sub;
  console.log(user);
  if (user) {
    logIn(user)
      .then(async (u) => {
        if (u === null) {
          res.status(200).json({ msg: "User is not Register" });
        } else {
          console.log("about  to verify user");

          const jwt = issueJWT(u);
          const redis = new Redis({
            host: "saas23-54-redis-1", // the service name defined in the docker-compose.yml file
            port: 6379, // the mapped port
          });
          console.log(`${u.user_id}Credits`);
          redis.set(`${u.user_id}Credits`, u.credits);
          const expiration = jwt.exp; //jwt.exp;

          await redis.expire(`${u.user_id}Credits`, expiration);
          res
            .status(200)
            .json({ user: { token: jwt.token, expires: jwt.expires } });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(400).json({ errmsg: "you should not be here" });
  }
};

const FindUserController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user: string | undefined = req.sub;

  if (user) {
    FindUser(user).then((u) => {
      if (u === null) {
        res.status(200).json({ msg: "User nor register in our services" });
      } else {
        try {
          const client = u as user;

          res.status(200).json({ user: client });
        } catch (err) {
          res.status(400).json({ err });
        }
      }
    });
  } else {
    res.status(400).json({ errmsg: "you should not be here" });
  }
};

const register = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user: string | undefined = req.sub;
  if (user) {
    FindUser(user).then((u) => {
      if (u === null) {
        Register(user)
          .then((u) => {
            try {
              const client = u as user;
              const jwt = issueJWT(client);
              res
                .status(200)
                .json({ user: { token: jwt.token, expires: jwt.expires } });
            } catch (err) {
              res.status(400).json({ err });
            }
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } else {
        res.status(400).json({ err: "You already exist " });
      }
    });
  } else {
    res.status(401).json({ err: "Access Deinied" }); //authetication has not work right if req.sub not created
  }
};

export { Login, register, FindUserController };
