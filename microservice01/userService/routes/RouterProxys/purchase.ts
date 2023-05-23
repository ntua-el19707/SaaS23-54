import { Router } from "express";
import { PurchasePlan, offers } from "../../controllers/purchase/controllers";
//import controllers

const PurchaseRouterServices: Router = Router();
//set up router
PurchaseRouterServices.route("/").post(PurchasePlan).get(offers);

export { PurchaseRouterServices };
