const { readFileSync, existsSync } = require("fs");
const { FileDoesNotExist, FileIsNotCsv } = require("./Error");
/**
 * function readCsv
 * @param FileName String
 * @returns file context
 */
function readCsv(FileName) {
  const path = `utils/Files/CSV/${FileName}`;
  if (existsSync(path)) {
    if (FileName.endsWith(".csv")) {
      const data = readFileSync(path, { encoding: "utf8", flag: "r" });
      return data;
    } else {
      throw new FileIsNotCsv("File is  not csv");
    }
  } else {
    throw new FileDoesNotExist("File does not exist"); // file does not exist
  }
}

module.exports = { readCsv };
