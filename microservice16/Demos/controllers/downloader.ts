import { Request, Response, NextFunction } from "express";
import { DownloadRequest } from "../utils/lib/request";
import * as path from "path";

const downloadController = (
    req: DownloadRequest,
    res: Response,
    next: NextFunction
) => {
    // Send the html file to the client
    const file:string = req.params.filename;
    if (file) {
        res.sendFile(
            path.join(__dirname, "../utils/Files/csv/", `${file}`),
            function (err) { }
        );
    }
    else {
        res.status(400).json({errormsg:"No filename provided"});
    }
}

export { downloadController};