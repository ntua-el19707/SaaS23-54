import { createProxyMiddleware } from "http-proxy-middleware";
import { Router, Response, NextFunction } from "express";
import { customauth } from "../../middlewares/auth";
import dotenv from "dotenv";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { typeVerification } from "../../middlewares/verificationtype";
import { downloadRouter } from "./donwload";
dotenv.config();

const routerServices: Router = Router();
let lineService = "http://12.0.0.1:3002";
console.log(process.env.LINESERVICE);
if (process.env.LINESERVICE) {
  lineService = process.env.LINESERVICE;
  console.log(lineService);
}

routerServices.use(customauth);
routerServices.route("/getUser").get((req: AuthRequest, res: Response) => {
  if (req.sub) {
    res.status(200).json({ user: req.sub });
  } else {
    res.status(401).json({ errmsg: "not authenticated" });
  }
});
routerServices.post(
  "/LineService/confirm",
  (req: AuthRequest, res: Response, next: NextFunction) => {
    next();
  },
  (req: AuthRequest, res, next) => {
    // Define the request configuration
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${lineService}/confirm`,
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
        next();
      })
      .catch((error) => {
        // Handle any errors if necessary
        console.log(error);
        next(error);
      });
  }
);
routerServices.post(
  "/NetworkService/confirm",
  (req: AuthRequest, res: Response, next: NextFunction) => {
    // Define the request configuration
    const networkService: string | undefined = process.env.NETWORKSERVICE;
    if (networkService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${networkService}/confirm`,
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
          res.json({ res: response.data });
        })
        .catch((error) => {
          // Handle any errors if necessary
          res.status(400).json({ err: error });
        });
    }
  }
);
routerServices.post(
  "/PollarService/confirm",
  (req: AuthRequest, res: Response, next: NextFunction) => {
    // Define the request configuration
    const PollarService: string | undefined = process.env.POLLARSERVICE;
    if (PollarService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${PollarService}/confirm`,
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
          res.json({ res: response.data });
        })
        .catch((error) => {
          // Handle any errors if necessary
          res.status(400).json({ err: error });
        });
    }
  }
);
routerServices.use("/downloadService", downloadRouter);

export { routerServices };
//;"http://saas23-54-line-1:3002/api_Line"
