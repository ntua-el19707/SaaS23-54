import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/AuthRequest";
import { logIn } from "../utils/mongo";
const Login = (req: AuthRequest, res: Response) => {
  const user: string | undefined = req.sub;
  console.log(user);
  if (user)
    logIn(user)
      .then((u) => {
        console.log(u);
        //res.status(200).json({ user });
      })
      .catch((err) => {
        // res.status(400).json({ err });
      });
  // res.status(400).json({ errmsg: "you should not be here" });
};
export { Login };
