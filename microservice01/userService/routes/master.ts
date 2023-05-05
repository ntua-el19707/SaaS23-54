import { Router } from "express";
import { auth } from "../middlewares/googleAuth";
import { Login } from "../controllers/user";

const router = Router();
// routes  will be Protected
router.use(auth);
//I will make a login route
//login route will add a user
router.route("/login").post(Login);
//thie will be use by the other services
//Purchase
//router.route("purchase").post();
//CanPurchase
//router.route("CanPurchase").get();

export default router;
