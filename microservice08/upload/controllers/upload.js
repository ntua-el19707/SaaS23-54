//impoprt chalck to give color to console.logs()
const chalk = require("chalk");
//import destroy
const { destroy } = require("../utils/lib/destroy");
const { readCsv } = require("../utils/lib/reader");
const { FileDoesNotExist, FileIsNotCsv } = require("../utils/lib/Error");
const { sendCSVFile } = require("../utils/lib/Producer");
const success = chalk.green;
const error = chalk.red.bold;
const red = chalk.red;
/** uploadPost -controller check if the upload happen and delete the copy files
 */
exports.uploadPost = (req, res, next) => {
  console.log("here");
  if (!req.file) {
    console.log(error("no file to upload  "));
    res.status(400).json({ errmsg: "no file to upload " });
  } else {
    console.log("one");
    const file = req.file.filename;
    req.MultFilesB.forEach((f) => {
      if (f !== file) {
        destroy(f); //destroy copy of file
        console.log(red(`copy file  ${f} deleted`));
      }
    });
    console.log(success(`file ${file} has suceesfully uploaded`));
    sendCSVFile(file, req.params.type)
      .then(() => {
        res.status(200).json({ msg: "File uploated", filename: file });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
};
exports.getData = (req, res, next) => {
  const id = req.params.id;
  try {
    const data = readCsv(id);

    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof FileDoesNotExist) {
      res.status(400).json({ err: "File dos not exist" });
    } else if (err instanceof FileIsNotCsv) {
      res.status(400).json({ err: "File is not csv" });
    } else {
      res.status(400).json({ err });
    }
  }
};
