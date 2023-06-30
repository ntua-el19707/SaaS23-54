import { Router } from "express";
import { find, findSpec } from "../controllers/find";
import { auth } from "../middlewares/auth";

const router = Router();
router.use(auth);
router.get("/up", (req, res) => {
  res.status(200).json({ msg: "service  is  up" });
});
router.route("/").get(find);
router.route("/:id").get(findSpec);

export { router };
