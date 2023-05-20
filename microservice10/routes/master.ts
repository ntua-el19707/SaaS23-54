import { Router } from "express";
import { find, findSpec } from "../controllers/find";
import { auth } from "../middlewares/auth";

const router = Router();
router.use(auth);
router.route("/").get(find);
router.route("/:id").get(findSpec);

export { router };
