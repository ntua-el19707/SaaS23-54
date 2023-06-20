import { Router, Request, Response } from "express";
import { PurchasePlan, offers } from "../../controllers/purchase/controllers";
import axios, { AxiosRequestConfig } from "axios";

//import controllers

const PurchaseRouterServices: Router = Router();
//set up router
PurchaseRouterServices.route("/").post(PurchasePlan).get(offers);
PurchaseRouterServices.route("/up").get((req: Request, res: Response) => {
  // Define the request configuration

  const PurchaseService: string | undefined = process.env.PURCHASESERVCIE;
  if (PurchaseService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${PurchaseService}`,
      headers: req.headers,
      data: req.body,
      validateStatus: (status) => status >= 200 && status < 400,
      responseType: "json",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        console.log(response.data);
        console.log("forward rsp");
        let msg = "";
        if (response.data.msg) {
          msg = response.data.msg;
        }
        res.status(200).json({ msg });
      })
      .catch((error) => {
        // Handle any errors if necessary
        if (error) console.log(error);
        res.status(400).json({ err: error });
      });
  } else {
    res
      .status(400)
      .json({ errmsg: "PurchaseService does  not exist in env file" });
  }
});

export { PurchaseRouterServices };
