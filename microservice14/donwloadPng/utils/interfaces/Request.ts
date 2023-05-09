import { Request } from "express";
export interface AuthRequest extends Request {
  sub?: string;
  File_id?: string;
}
export interface uploadRequest extends AuthRequest {
  MultFilesB?: string[];
}
