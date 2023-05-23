import { NextFunction, Response } from "express";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";
import axios, { AxiosRequestConfig } from "axios";

/**
 * Controller: PurchasePlan
 * @param req - AuthRequest object
 * @param res - Response object
 * @param next - NextFunction
 * @returns void
 */
const PurchasePlan = (req: AuthRequest, res: Response, next: NextFunction) => {
  const PurchaseService: string | undefined = process.env.PURCHASESERVCIE;
  if (PurchaseService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${PurchaseService}/offers/`,
      headers: req.headers,
      data: req.body,
      responseType: "json",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        console.log(response.data);
        res.status(200).json({ purchase: response.data.purchase });
      })
      .catch((error) => {
        // Handle any errors if necessary
        if (error.response) {
          console.log("Error Status:", error.response.status);
          console.log("Error Data:", error.response.data);
          res
            .status(error.response.status)
            .json({ errmsg: error.response.data });
        } else if (error.request) {
          console.log("Error Request:", error.request);
          res.status(500).json({ errmsg: "Request error" });
        } else {
          console.log("Error:", error.message);
          res.status(500).json({ errmsg: "Unknown error" });
        }
      });
  } else {
    res
      .status(400)
      .json({ errmsg: "Purchase service does not exist in env file" });
  }
};

/**
 * Controller: offers
 * @param req - AuthRequest object
 * @param res - Response object
 * @param next - NextFunction
 * @returns void
 */
const offers = (req: AuthRequest, res: Response, next: NextFunction) => {
  const PurchaseService: string | undefined = process.env.PURCHASESERVCIE;
  if (PurchaseService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${PurchaseService}/offers/`,
      headers: req.headers,
      data: req.body,
      responseType: "json",
      responseEncoding: "utf8",
    };

    // Send the request using axios
    axios(config)
      .then((response) => {
        // Do something with the response if needed
        console.log(response.data);
        res.status(200).json({ plans: response.data.plans });
      })
      .catch((error) => {
        // Handle any errors if necessary
        if (error.response) {
          console.log("Error Status:", error.response.status);
          console.log("Error Data:", error.response.data);
          res
            .status(error.response.status)
            .json({ errmsg: error.response.data });
        } else if (error.request) {
          console.log("Error Request:", error.request);
          res.status(500).json({ errmsg: "Request error" });
        } else {
          console.log("Error:", error.message);
          res.status(500).json({ errmsg: "Unknown error" });
        }
      });
  } else {
    res
      .status(400)
      .json({ errmsg: "Purchase service does not exist in env file" });
  }
};

export { PurchasePlan, offers };
