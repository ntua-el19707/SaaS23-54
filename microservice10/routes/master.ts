import { Router } from "express";
import { find, findSpecificAndBuild } from "../controllers/find";
const router = Router();
router.get("/", find);
router.route("/:id").get(findSpecificAndBuild);
export { router };
