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
  const path = `utils/Files/CSV/${FileName}`;
  //const path = `../../Files/CSV/${FileName}`;
  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  return data;
}
/**
 * spliteer - splite a line and get context
 * @param {*} lines array string
 * @param {*} index int
 * @returns  array string
 */
function spliter(lines, index) {
  let fields = lines[index].split("\r")[0].split(",");
  fields = fields.filter(function (e) {
    return e.replaceAll(/(\r\n|\n|\r)/gm, "");
  });
  let rsp = [];
  fields.forEach((e) => {
    rsp.push(e.replaceAll(/\s/g, ""));
  });

  return rsp;
}
function csvJSON(csv) {
  const valid = ["plotOptions", "title", "Subtitle"];
  let json = {};
  let lines = csv.split("\n");
  let index = 0;
  let size = lines.length;
  json.series = [];
  while (index < size) {
    let field = spliter(lines, index)[0];
    if (field === "series") {
      let data = readSeries(lines, index + 1);
      json.series.push(data.rsp);
      index = data.index;
    } else if (valid.includes(field)) {
      const data = readFields(lines, index + 1);
      json[field] = data.json;
      index += 2;
    }
    ++index;
  }
  console.log(json);
  return json;
}
function getJsonFromFile(file) {
  let data = readCsv(file);
  return csvJSON(data);
}
/**readSeries - read series
 * @params lines array
 * @params index number
 */
function readSeries(lines, index) {
  const size = lines.length;
  const fields = spliter(lines, index);
  const validFields = ["type", "name", "data"];
  fields.forEach((f) => {
    if (!validFields.includes(f)) {
      throw new Error("invalid input");
    }
  });
  if (fields.length !== 3) {
    throw new Error("invalid input");
  }
  ++index;
  const dataP = fields.indexOf("data");
  const nameP = fields.indexOf("name");
  const typeP = fields.indexOf("type");
  let data = spliter(lines, index);
  let rsp = {
    name: data[nameP],
    type: data[typeP],
    data: [],
  };
  while (index < size) {
    if (data[0] === "end") {
      break;
    }
    rsp.data.push(data[dataP]);
    ++index;
    data = spliter(lines, index);
  }
  return { rsp, index };
}
/**
 * readFields -return normal fields data
 * @param {*} line array
 * @param {*} index number
 * @returns json object
 */
function readFields(lines, index) {
  let fields = spliter(lines, index);
  let dataL = spliter(lines, index + 1);
  let json = {};

  const size = fields.length;
  for (let i = 0; i < size; i++) {
    if (fields[i] !== "") {
      json[fields[i]] = dataL[i];
    }
  }
  return { json, fields };
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
