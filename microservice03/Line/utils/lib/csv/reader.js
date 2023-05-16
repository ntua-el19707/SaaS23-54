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
const valid_3 = ["title", "Subtitle", "Xaxis", "Yaxis"]; //?for start i am gon eimpemnte for straight line if it works for all i make  it module acessible to all services
const axisvalid = [];
function csvJSON(csv) {
  let json = {}; //create an mpty json to store  return
  const lines = csv.split("\n");
  let series = [];
  let index = 0;
  const size = lines.length;
  let valid = true;
  while (index < size) {
    const field = lines[index].split("/r")[0].split(",")[0];
    let data = "";
    field.replaceAll(/\s/g, "");
    if (valid_3.includes(field)) {
      data = readFields(lines[index + 1], lines[index + 2]);
      index += 3;
      json[field] = data.json;
    } else if (field === "series") {
      let out = readSeries(lines, index + 1);
      series.push(out.json);

      index = out.index;
      ++index;
    } else if (axisvalid.includes(field)) {
      data = readFields(lines[index + 1], lines[index + 2]);
      index += 3;
      // console.log(data);
      data.json.forEach(([key, value]) => {
        if (titleSchema.includes(key)) {
          json[field].title[key] = value;
        }
        if (key === "format") {
          json[field].format = value;
        }
      });
    } else {
      //wrong input

      valid = false;
      break;
    }
  }
  json.series = series;
  return json;
}
function splitr(line) {
  let split = line.split("\r")[0];
  if (split) {
    return { split, valid: true };
  }
  return { valid: false };
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

function readSeries(lines, index) {
  let fields = lines[index].split("\r")[0].split(",");
  let data0 = lines[++index].split("\r")[0].split(",");

  const size = lines.length;
  let posType = fields.indexOf("type");
  let pos = fields.indexOf("data");
  let posx = fields.indexOf("datax");
  let posy = fields.indexOf("datay");
  let json = {};
  let dataArray = [];
  let dataArrayy = [];
  let two = false;
  if (posType !== -1) {
    if (data0[posType] === "XY") two = true;
    //console.log(fields);
  }
  for (let i = 0; i < fields.length; i++) {
    if (!two) {
      if (i === pos) {
        dataArray = [data0[i]];
      }
    } else {
      if (i === posx) {
        // console.log(i);
        dataArray = [data0[i]];
      }
      if (i === posy) {
        dataArrayy = [data0[i]];
      }
    }
    if (fields[i] !== "") json[fields[i]] = data0[i];
  }

  while (index < size) {
    if (!two) {
      ++index;

      let data = splitr(lines[index]);
      if (!data.valid) {
        break;
      }
      data = data.split.split(",");

      if (data[pos] === "END") {
        break;
      }
      dataArray.push(data[pos]);
    } else {
      ++index;

      let data = splitr(lines[index]);
      if (!data.valid) {
        break;
      }
      data = data.split.split(",");
      if (valid_3.includes(data[0])) {
        throw "not valid input";
      }
      if (data[posx] === "END" && data[posy] === "END") {
        break;
      } else if (data[posx] === "END" && data[posy] !== "END") {
        throw "not valid input";
      } else if (data[posx] !== "END" && data[posy] === "END") {
        throw "not valid input";
      }
      dataArray.push(data[posx]);
      dataArrayy.push(data[posy]);
    }
  }
  if (two) {
    json.datax = dataArray;
    json.datay = dataArrayy;
  } else {
    json.data = dataArray;
  }
  return { json, index };
}
function getJsonFromFile(data) {
  return csvJSON(data);
}
function destroy(filename) {
  const path = `utils/Files/CSV/${filename}`;
  try {
    unlinkSync(path);
    console.log("delete " + path);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { getJsonFromFile, destroy };
