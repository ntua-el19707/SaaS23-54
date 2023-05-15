import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { FindUser, logIn, Register } from "../utils/mongo";
import { user } from "../utils/interfaces/user";

const Login = (req: AuthRequest, res: Response) => {
  const user: string | undefined = req.sub;
  console.log(user);
  if (user) {
    logIn(user)
      .then((u) => {
        if (u === null) {
          res.status(200).json({ msg: "User is not Register" });
        } else {
          res.status(200).json({ user: u });
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
              res.status(200).json({ user: client });
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
