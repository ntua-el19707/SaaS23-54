
const { getJsonFromFile, destroy } = require("../utils/lib/csv/reader");
const { insertChart } = require("../utils/lib/mongodb");
const { validateInput } = require("../utils/lib/valodators/validators");
/** uploadPost -controller check if the upload happen and delete the copy files
 */
exports.uploadPost = (req, res, next) => {
  if (!req.file) {
    console.log("no file to upload  ");
    res.status(400).json({ errmsg: "no file to upload " });
  } else {
    const file = req.file.filename;
    req.MultFilesB.forEach((f) => {
      if (f !== file) {
        destroy(f); //destroy copy of file
        console.log("destory");
      }
    });
    res.status(200).json({ msg: "File uploated", filename: file });
  }
};
/**
 * saveDB - controller save data in DB and the delete the csv 
 */
exports.saveDB = (req, res, next) => {
  const file = req.body.file;
  if (file) {
    try {
      const data = getJsonFromFile(file); // get data from csv  ;
      //   destroy(file);
      console.log(validateInput(data));
      if (validateInput(data)) {
        insertChart(data, "madara").then(() => {
          res.status(200).json({ msg: "ok" });
        });
      } else {
        res.status(400).json({ errmsg: "not valid input" });
      }
    } catch (err) {
      console.log(err);
      destroy(file);
      res.status(400).json({ errmsg: "not valid input" });
    }
  } else {
    res.status(404).json({ errmsg: "You have not provide the filename" });
  }
};
