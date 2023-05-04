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
  const path = pathM.join(
    __dirname,
    `../../../../../microservice08/upload/utils/Files/CSV/${FileName}`
  );
  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  return data;
}
function spliter(lines, index) {
  return lines[index].split("\r")[0].split(",");
}
const valid_3 = ["title", "Subtitle"];
function csvJSON(csv) {
  let json = {};
  const lines = csv.split("\n");
  let index = 0;
  const size = lines.length;
  while (index < size) {
    const field = spliter(lines, index)[0];

    if (field.replace(/\s/g, "") === "series") {
      const series = readSeries(lines, index + 1);

      json.series = {};
      json.series.data = series.data;
      index = series.index;
      ++index;
    } else if (valid_3.includes(field.replace(/\s/g, ""))) {
      data = readFields(lines[index + 1], lines[index + 2]);
      index += 3;
      json[field] = data.json;
    } else {
      ++index;
    }
  }
  return json;
}
function readSeries(lines, index) {
  let rsp = []; //response
  while (index < lines.length) {
    let data = spliter(lines, index);
    data = data.filter(function (e) {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });

    if (data.length === 0) {
      throw "invalid file";
    }
    if (data[0] === "end") {
      break;
    }
    if (data.length >= 2) {
      if (data[1] === "end") {
        break;
      }
      rsp.push([data[0], data[1]]);
      ++index;
    }
  }
  return { data: rsp, index };
}
function readFields(line, data) {
  let fields = line.split("\r")[0].split(",");
  let dataL = data.split("\r")[0].split(",");
  let json = {};

  const size = fields.length;
  for (let i = 0; i < size; i++) {
    if (fields[i] !== "") {
      json[fields[i]] = dataL[i];
    }
  }
  return { json, fields };
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
