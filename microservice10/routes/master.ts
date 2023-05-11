import { Router } from "express";
import { find, findSpec } from "../controllers/find";
import { InsertRouter } from "./insertchart";
import { auth } from "../middlewares/auth";

const router = Router();
router.use(auth);
router.route("/").get(find);
router.route("/:id").get(findSpec);
router.use("/insertChart", InsertRouter);
export { router };
