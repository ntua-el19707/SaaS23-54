import { Router } from "express";
import {
  PurchaseChart,
  PurchasePlan,
  FindAvailablePacks,
} from "../controllers/user";
import { auth } from "../middlewares/auth";

const MasterRouter = Router();
MasterRouter.use(auth);

MasterRouter.route("/PurchasedDiagram/:id").post(PurchaseChart);
MasterRouter.route("/offers").get(FindAvailablePacks).post(PurchasePlan);

export { MasterRouter };
