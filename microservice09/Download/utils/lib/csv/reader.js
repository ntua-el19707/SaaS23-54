/**
 * module reader.js
 * @author  el19707
 *
 */

const { readFileSync, unlinkSync } = require("fs");

/**
 * function readCsv
 * @param FileName String
 * @returns file context
 */
function readCsv(FileName) {
  const path =`utils/Files/CSV/${FileName}` ;
  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  return data;
}

function csvJSON(csv) {
  let json ; 
  //TODO implement reading stragtegy
  return json;
}
function getJsonFromFile(file) {
  let data = readCsv(file);
  return csvJSON(data);
}
/**
 * destroy - function  delete a file 
 * @params FileName string
 */
function destroy(FileName) {
  const path = `utils/Files/CSV/${FileName}`;
  try {
    unlinkSync(path);
    console.log("delete " + path);
    return true;
  } catch (err) {
    return false;
  }
}
module.exports = { getJsonFromFile, destroy };
