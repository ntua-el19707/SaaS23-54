import { Router, Response } from "express";
import { customauthNocredits } from "../../middlewares/auth";
import dotenv from "dotenv";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";

import { DiagramRouterServices } from "./diagrams";
import { myDiagramsRouter } from "./Mydiagrams";
import { PurchaseRouterServices } from "./purchase";

dotenv.config();

const routerServices: Router = Router();
routerServices.use("/Diagrams", DiagramRouterServices);
routerServices.use(customauthNocredits); //the following  routes  does not  need authetication  with seting credits in rams  if not existed
routerServices.route("/getUser").get((req: AuthRequest, res: Response) => {
  if (req.sub) {
    res.status(200).json({ user: req.sub });
  } else {
    res.status(401).json({ errmsg: "not authenticated" });
  }
});
routerServices.use("/MyDiagrams", myDiagramsRouter); //My - diagrams Services
routerServices.use("/Purchase", PurchaseRouterServices); //Purchase Services
export { routerServices };
