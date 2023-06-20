//here are the diagram  Routes ;
import { Router, Response, NextFunction, Request } from "express";
import { customauthCredits } from "../../middlewares/auth";
import dotenv from "dotenv";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";
import axios, { AxiosRequestConfig } from "axios";
dotenv.config();

const DiagramRouterServices: Router = Router();
DiagramRouterServices.use(customauthCredits);
DiagramRouterServices.route("/getUser").get(
  (req: AuthRequest, res: Response) => {
    if (req.sub) {
      res.status(200).json({ user: req.sub });
    } else {
      res.status(401).json({ errmsg: "not authenticated" });
    }
  }
);
//get -   service  up
DiagramRouterServices.route("/LineService").get(
  (req: Request, res: Response) => {
    // Define the request configuration

    const lineService: string | undefined = process.env.LINESERVICE;
    if (lineService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${lineService}`,
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
        .json({ errmsg: "LINESERVICE does  not exist in env file" });
    }
  }
);
//post - confirm
DiagramRouterServices.post(
  "/LineService/confirm",

  (req: AuthRequest, res, next) => {
    // Define the request configuration

    const lineService: string | undefined = process.env.LINESERVICE;
    if (lineService) {
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
          console.log("forward rsp");
          res.json({ res: response.data });
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.log(error);
          res.status(400).json({ err: error });
        });
    } else {
      res
        .status(400)
        .json({ errmsg: "LINESERVICE does  not exist in env file" });
    }
  }
);

//get service  up
DiagramRouterServices.get(
  "/NetworkService",
  (req: Request, res: Response, next: NextFunction) => {
    // Define the request configuration
    const networkService: string | undefined = process.env.NETWORKSERVICE;
    if (networkService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${networkService}`,
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
          let msg = "";
          if (response.data.msg) {
            msg = response.data.msg;
          }
          res.status(200).json({ msg });
        })
        .catch((error) => {
          // Handle any errors if necessary
          res.status(400).json({ err: error });
        });
    }
  }
);
//post service
DiagramRouterServices.post(
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
DiagramRouterServices.get(
  "/PollarService",
  (req: Request, res: Response, next: NextFunction) => {
    // Define the request configuration
    const PollarService: string | undefined = process.env.POLLARSERVICE;

    if (PollarService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${PollarService}`,
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
          let msg = "";
          if (response.data.msg) {
            msg = response.data.msg;
          }
          res.status(200).json({ msg });
        })
        .catch((error) => {
          // Handle any errors if necessary
          res.status(400).json({ err: error });
        });
    }
  }
);
DiagramRouterServices.post(
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

DiagramRouterServices.get(
  "/CollumnService",
  (req: AuthRequest, res: Response, next: NextFunction) => {
    // Define the request configuration
    const CollumnService: string | undefined = process.env.COLLUMNSERVICE;
    if (CollumnService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${CollumnService}`,
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
          let msg = "";
          if (response.data.msg) {
            msg = response.data.msg;
          }
          res.status(200).json({ msg });
        })
        .catch((error) => {
          // Handle any errors if necessary
          res.status(400).json({ err: error });
        });
    }
  }
);
DiagramRouterServices.post(
  "/CollumnService/confirm",
  (req: AuthRequest, res: Response, next: NextFunction) => {
    // Define the request configuration
    const CollumnService: string | undefined = process.env.COLLUMNSERVICE;
    if (CollumnService) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${CollumnService}/confirm`,
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
DiagramRouterServices.get(
  "/DepentancyWheelService",

  (req: AuthRequest, res, next) => {
    // Define the request configuration

    const Service: string | undefined = process.env.DEPENDANCYSERVICE;
    if (Service) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${Service}`,
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
          let msg = "";
          if (response.data.msg) {
            msg = response.data.msg;
          }
          res.status(200).json({ msg });
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.log(error);
          res.status(400).json({ err: error });
        });
    } else {
      res.status(400).json({
        errmsg: "dependecy wheel SERVICE does  not exist in env file",
      });
    }
  }
);
DiagramRouterServices.post(
  "/DepentancyWheelService/confirm",

  (req: AuthRequest, res, next) => {
    // Define the request configuration

    const Service: string | undefined = process.env.DEPENDANCYSERVICE;
    if (Service) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${Service}/confirm`,
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
          console.log("forward rsp");
          res.json({ res: response.data });
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.log(error);
          res.status(400).json({ err: error });
        });
    } else {
      res.status(400).json({
        errmsg: "dependecy wheel SERVICE does  not exist in env file",
      });
    }
  }
);
DiagramRouterServices.get(
  "/LineAnnotationService",

  (req: Request, res: Response, next: NextFunction) => {
    // Define the request configuration

    const Service: string | undefined = process.env.LINEANNOTATIONSERVICE;
    if (Service) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${Service}`,
        headers: req.headers,
        data: req.body,
        validateStatus: (status) => status >= 200 && status < 400,
        responseType: "json",
        responseEncoding: "utf8",
      };

      // Send the request using axios
      axios(config)
        .then((response) => {
          let msg = "";
          if (response.data.msg) {
            msg = response.data.msg;
          }
          res.status(200).json({ msg });
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.log(error);
          res.status(400).json({ err: error });
        });
    } else {
      res.status(400).json({
        errmsg: "line annotattion SERVICE does  not exist in env file",
      });
    }
  }
);
DiagramRouterServices.post(
  "/LineAnnotationService/confirm",

  (req: AuthRequest, res, next) => {
    // Define the request configuration

    const Service: string | undefined = process.env.LINEANNOTATIONSERVICE;
    if (Service) {
      let config: AxiosRequestConfig = {
        method: req.method,
        url: `${Service}/confirm`,
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
          console.log("forward rsp");
          res.json({ res: response.data });
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.log(error);
          res.status(400).json({ err: error });
        });
    } else {
      res.status(400).json({
        errmsg: "line annotattion SERVICE does  not exist in env file",
      });
    }
  }
);

export { DiagramRouterServices };
