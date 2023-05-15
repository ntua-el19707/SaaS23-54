import axios, { AxiosResponse } from "axios";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../utils/interfaces/AuthRequest";

/**
 * auth middleware - checks if the request has a valid jwt token and retrieves the user information
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get auth service url from environment variables
  const auth_server = process.env.auth_service;

  // Get jwt token from authorization header
  const jwt = req.headers.authorization;

  // Set authorization header for axios requests
  axios.defaults.headers.common["authorization"] = jwt;
  console.log(jwt);
  // Make request to auth service to get user information
  axios
    .get(`${auth_server}/api_user/user`)
    .then((response: AxiosResponse) => {
      // Get user information from response
      const user = response.data.user;

      // Set user id as sub property of request object
      req.sub = user._id;
      console.log(req.sub);
      // Call next middleware
      next();
    })
    .catch((error) => {
      console.log(error);
      // If there's an error, send error response with error code and message
      res.status(error.response.status).json({ error });
    });
};
