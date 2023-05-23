import { NextFunction, Response } from "express";
import { AuthRequest } from "../../utils/interfaces/AuthRequest";
import axios, { AxiosRequestConfig } from "axios";

/**
 * Controller: GetJsonArray
 * @params     req - AuthRequest object
 *             res - Response object
 *             next - NextFunction
 * returns  void
 */
const GetJsonArray = (req: AuthRequest, res: Response, next: NextFunction) => {
  const MydiagramsService: string | undefined = process.env.MYDIAGRAMSSERVICE;
  if (MydiagramsService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${MydiagramsService}/`,
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
        res.status(200).json({ charts: response.data.charts });
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
    res.status(400).json({ errmsg: "MyDiagrams does not exist in env file" });
  }
};

/**
 * Controller: GetSpeciffic
 * Parameters: req - AuthRequest object
 *             res - Response object
 *             next - NextFunction
 * Returns: void
 */
const GetSpeciffic = (req: AuthRequest, res: Response, next: NextFunction) => {
  const MydiagramsService: string | undefined = process.env.MYDIAGRAMSSERVICE;
  if (MydiagramsService) {
    let config: AxiosRequestConfig = {
      method: req.method,
      url: `${MydiagramsService}/${req.params.id}`,
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
        res.status(200).json({ chart: response.data.chart });
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
    res.status(400).json({ errmsg: "MyDiagrams does not exist in env file" });
  }
};

export { GetJsonArray, GetSpeciffic };
