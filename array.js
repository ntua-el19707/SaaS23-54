/**
 * module reader.js
 * @author  el19707
 *
 */

const { readFileSync, unlinkSync } = require("fs");
const pathM = require("path");
/**
 * function readCsv
 * @param FileName String
 * @returns file context
 */
function readCsv(FileName) {
  const path = `${FileName}`;

  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  return data;
}

function csvTables(csv) {
  const lines = csv.split("\n");
  let max = 0;
  let rsp = [];
  for (let i = 0; i < lines.length; i++) {
    let row = spliter(lines, i);
    rsp.push(row);
    if (row.length > max) {
      max = row.length;
    }
  }
  for (let i = 0; i < rsp.length; i++) {
    while (rsp[i].length < max) {
      rsp[i].push(",");
    }
  }

  console.log(rsp, max);
}

/**
 * spliteer - splite a line and get context
 * @param {*} lines array string
 * @param {*} index int
 * @returns  array string
 */
function spliter(lines, index) {
  let fields = lines[index].split("\r")[0].split(",");

  return fields;
}

csvTables(readCsv("file.csv"));
