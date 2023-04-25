//impoprt chalck to give color to console.logs()
const chalk = require("chalk");
//import destroy
const { destroy } = require("../utils/lib/destroy");
const success = chalk.green;
const error = chalk.red.bold;
const red = chalk.red;
/** uploadPost -controller check if the upload happen and delete the copy files
 */
exports.uploadPost = (req, res, next) => {
  if (!req.file) {
    console.log(error("no file to upload  "));
    res.status(400).json({ errmsg: "no file to upload " });
  } else {
    const file = req.file.filename;
    req.MultFilesB.forEach((f) => {
      if (f !== file) {
        destroy(f); //destroy copy of file
        console.log(red(`copy file  ${f} deleted`));
      }
    });
    console.log(success(`file ${file} has suceesfully uploaded`));
    res.status(200).json({ msg: "File uploated", filename: file });
  }
};
