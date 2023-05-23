import { Router } from "express";
//import controllers
import {
  GetJsonArray,
  GetSpeciffic,
} from "../../controllers/myDiagrams/controllers";

const myDiagramsRouter: Router = Router();
//set up router
myDiagramsRouter.route("/").get(GetJsonArray); //get Array   of  Diagrams
myDiagramsRouter.route("/:id").get(GetSpeciffic); // get specific  Diagram
export { myDiagramsRouter };
