import { Router } from "express";
import { auth } from "../middlewares/googleAuth";
import { FindUserController, Login, register } from "../controllers/user";

const router = Router();
// routes  will be Protected
router.use(auth);
//I will make a login route
//login route will add a user
router.route("/login").post(Login); //thie will be use by the other services
router.route("/user").get(FindUserController);
router.route("/register").post(register);

//this  service  will store only clients and there  credits

export default router;
