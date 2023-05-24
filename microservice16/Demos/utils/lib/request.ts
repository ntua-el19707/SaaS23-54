import {Request} from "express";

export interface DownloadRequest extends Request {
    file?:String;
}