import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/interfaces/AuthRequest";
import {
  FindUser,
  getAvailplePackets,
  InserteUser,
  Purchase,
  purchasedChartFunction,
} from "../utils/mongo";
import { packet } from "../utils/interfaces/packet";
import { ObjectId } from "mongodb";
import { clients } from "../utils/interfaces/user";

const PurchasePlan = (req: AuthRequest, res: Response) => {
  const user: string | undefined = req.sub;
  console.log(user);
  if (user) {
    if (req.body.plan) {
      const plan: packet = trickPacket(req.body.plan);
      Purchase(user, plan, null)
        .then((rsp) => {
          console.log(rsp);
          res.status(200).json({ purchase: "ok" });
        })
        .catch((err) => {
          res.status(400).json({ err });
        });
    } else {
      res.status(400).json({ errmsg: "not provided a plan for purchase" });
    }
  } else {
    res.status(400).json({ errmsg: "you should not be here" });
  }
};
function trickPacket(packet: any): packet {
  let rsp: packet = { name: "", credits: 0 };
  if (packet.name) rsp.name = packet.name;
  if (packet.credits) rsp.credits = packet.credits;
  return rsp;
}
const PurchaseChart = (req: AuthRequest, res: Response, next: NextFunction) => {
  const chart = req.params.id;
  const user: string | undefined = req.sub;
  if (user) {
    purchasedChartFunction(chart, user)
      .then((rsp) => {
        console.log(rsp);
        res.status(200).json({ purchase: "ok" });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(400).json({ errmsg: "you should not be here" });
  }
};

const FindAvailablePacks = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  const Plans = getAvailplePackets();
  res.status(200).json({ plans: Plans });
};
/**
 * client  get client
 * @param Req
 * @param Res
 * @param next
 */
const GetClient = (req: AuthRequest, res: Response, next: NextFunction) => {
  const client = req.sub;
  console.log("one");
  if (client) {
    FindUser(client)
      .then((user: clients | null) => {
        if (user === null) {
          res.status(200).json({ msg: "client not register in db" });
        } else {
          res.status(200).json({ user });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(401).json({ errmsg: "user not authenticated" });
  }
};
const postClient = (req: AuthRequest, res: Response, next: NextFunction) => {
  const client = req.sub;

  if (client) {
    InserteUser(client)
      .then((id: ObjectId) => {
        res
          .status(200)
          .json({ msg: `client have been  register with _id:${id}` });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
  } else {
    res.status(401).json({ errmsg: "user not authenticated" });
  }
};
export {
  PurchasePlan,
  PurchaseChart,
  FindAvailablePacks,
  GetClient,
  postClient,
};
