import { Router } from "express";
import { auth } from "../middlewares/googleAuth";
import { FindUserController, Login, register } from "../controllers/user";
import { routerServices } from "./RouterProxys/master";
import { customauthNocredits } from "../middlewares/auth";

const router = Router();
// routes  will be Protected
router.use("/services", routerServices);
router.route("/user").get(customauthNocredits, FindUserController);
//I will make a login route
//login route will add a user
router.route("/login").post(auth, Login); //thie will be use by the other services

router.route("/register").post(auth, register);

//this  service  will store only clients and there  credits

export default router;
