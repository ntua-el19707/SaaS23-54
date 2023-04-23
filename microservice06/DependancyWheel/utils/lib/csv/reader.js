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

const valid_2 = ["title"];

function csvJSON(csv) {
  let json ; 
  //TODO implement reading stragtegy
  const lines = csv.split("\n");
  let series = [];
  //maybe?
  let keys = [];

  let index = 0;
  const size = lines.length;
  while (index < size){
    const field = lines[index].split("/r")[0].split(",")[0];
    let data = "";
    if(valid_2.includes(field)){
      data = readFields(lines[index + 1], lines[index + 2]);
      index += 3;
      json[field] = data.json;
    } 
    else if (field === "series") {
      let out = readSeries(lines, index + 1); 
      series.push(out); 
    }
    else {
      //wrong input
      break;
    }
  }
  json.series = series;
  return json;
}

function readFields(line, data) {
  console.log(data);
  let fields = line.split("\r")[0].split(",");
  let dataL = data.split("\r")[0].split(",");
  let json = {};

  const size = fields.length;
  for (let i = 0; i < size; i++) {
    if (fields[i] !== "") json[fields[i]] = dataL[i];
  }
  return { json, fields };
}


function readSeries(lines, index) {
  //skip key line
  index++;
  let fields = lines[index++].split("\r")[0].split(",");
  //skip data line
  index++
  const size = lines.length;
  let json = {};
  let dataArray = [];

  while (index < size) {

    let data0 = lines[index++].split("\r")[0].split(",");

    if (!data.valid) {
      break;
    }
    for (let i = 0; i < 3; i++) {
      if (i === 2) {
        data0[2] = parseFloat(data0[2]);
      }
      json[fields[i]] = data0[i];
    }
  }
  dataArray.push(json);

  const series = {
    keys: fields,
    data: data0
  };
  return series;
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
