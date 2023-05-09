import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import { destroy } from "../utils/lib/destroy";
import { uploadRequest } from "../utils/interfaces/Request";
import { downloadDocs } from "../utils/interfaces/docs";
import { insertChart } from "../utils/lib/mongodb";
const success = chalk.green;
const error = chalk.red.bold;
const red = chalk.red;

/** uploadPost - controller checks if the upload happened and deletes the copy files */
export const uploadPost = (
  req: uploadRequest,
  res: Response,
  next: NextFunction
) => {
  let owner = ""; //there is not a chande that this will remain  '' auth  first  of all no one can use servsie without having a valid login
  if (req.sub) {
    owner = req.sub;
  }
  // check if there's no file to upload
  if (!req.file) {
    console.log(error("no file to upload  "));
    res.status(400).json({ errmsg: "no file to upload " });
  } else {
    // get the uploaded file's filename
    const file = req.file.filename;
    const doc: downloadDocs = {
      chart_id: req.params.id,
      ownerShip: owner,
      timestamp: Date(),
      file: file,
    };
    let insert: Promise<void> = insertChart(doc);
    // loop through any uploaded copy files and delete them
    if (req.MultFilesB)
      req.MultFilesB.forEach((f: string) => {
        if (f !== file) {
          destroy(f); //destroy copy of file
          console.log(red(`copy file  ${f} deleted`));
        }
      });
    // log a success message if the upload was successful
    console.log(success(`file ${file} has successfully uploaded`));
    insert
      .then(() => {
        res.status(200).json({ msg: "chart html uploade to server " });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
  }
};
