import { Router } from "express";
import { DonwloadRouter } from "./downloads";
import { UploadRouter } from "./upload";
import { auth } from "../middlewares/auth";
const router = Router();
//router.use(auth);
router.use("/", DonwloadRouter);
router.use("/", UploadRouter);
export { router };
