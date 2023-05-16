import { Router } from "express";
import { DonwloadRouter } from "./downloads";

import { auth } from "../middlewares/auth";
const router = Router();
router.use(auth);
router.use("/", DonwloadRouter);

export { router };
