import { Router } from "express";
import { auth } from "../middlewares/googleAuth";
import {
  FindAvailablePacks,
  FindUserController,
  Login,
  PurchaseChart,
  PurchasePlan,
  register,
} from "../controllers/user";

const router = Router();
// routes  will be Protected
router.use(auth);
//I will make a login route
//login route will add a user
router.route("/login").post(Login); //thie will be use by the other services
//router.route("/getPlans").get();
router.route("/Purchase").post(PurchasePlan);
router.route("/Purchase/:id").post(PurchaseChart);
router.route("/offers").post(FindAvailablePacks);
router.route("/user").get(FindUserController);
router.route("/register").post(register);

//Purchase
//router.route("purchase").post();
//CanPurchase
//router.route("CanPurchase").get();

export default router;
