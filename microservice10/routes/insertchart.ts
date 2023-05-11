import { Router } from "express";
import { PostLine, PostNetork, PostPollar } from "../controllers/insert";

const InsertRouter = Router();

InsertRouter.route("/Lines").post(PostLine);
InsertRouter.route("/Pollar").post(PostPollar);
InsertRouter.route("/Network").post(PostNetork);
export { InsertRouter };
