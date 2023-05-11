import { Request } from "express";
import { NetworkChart, PollarChart, linesChart } from "./sechema";
export interface AuthRequest extends Request {
  sub?: string;
}
export interface PostLineRequest extends AuthRequest {
  chart?: linesChart;
}
export interface PostNetworkRequest extends AuthRequest {
  chart?: NetworkChart;
}

export interface PostPollarRequest extends AuthRequest {
  chart?: PollarChart;
}
