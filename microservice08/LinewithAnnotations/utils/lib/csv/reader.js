/**
 * module reader.js
 * @author  el18716
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
  /*
  const path = pathM.join(
    __dirname,
    `../../../../../microservice16/upload/utils/Files/CSV/${FileName}`
  );
  */
 // const path = `../../Files/CSV/${FileName}`;
  //const path = `./${FileName}`;
  
  const path = pathM.join(__dirname,FileName);

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
  const valid = ["annotations", "title"];
  let json = {};
  let lines = csv.split("\n");
  //console.log(lines)
  let index = 0;
  let size = lines.length;
  json.series = [];
  
  json.annotations = {} 
  json.annotations.labels = [];
  
  while (index < size) {
    let field = spliter(lines, index)[0];
    if (field === "series") {
      let data = readSeries(lines, index + 1);
      //console.log(data.rsp);
      json.series.data = data.rsp;
      index = data.index;
    } else if (field === "annotations") {
        const data = readAnnotations(lines, index + 1);
        json.annotations.labels = (data.rsp);
        index = data.index;
    } else if (valid.includes(field)) {
      const data = readFields(lines, index + 1);
      json[field] = data.json;
      index += 2;
    }
    ++index;
  }

  //console.log(json.series.data);
  //console.log(json.annotations.labels);
  console.log(JSON.stringify(json));
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
    ++index;
    
    let elevation_data = [];

    while (index < size) {

        data = spliter(lines, index);
        console.log(data);
        if (data[0] === "end") {
            break;
        }

       //if (data.length != 5)
        //    throw new Error("invalid input");
        
        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);
        
        elevation_data.push(data);
        ++index;
        }

    let rsp = {
        data: elevation_data
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

function readAnnotations(lines, index) {
    const size = lines.length;
    ++index;

    let labels = [];

    let data = spliter(lines, index);
    xAxis = data[0];
    yAxis = data[1];
    
    while (data[0] != "series") {
        //check if valid?
        let label = {
            point: {
              xAxis: xAxis,
              yAxis: yAxis,
              x: data[2],
              y: data[3]
            },
            text: data[4]
          };
          labels.push(label);
          console.log("try here:" + label.point.y)

          index++;
          data = spliter(lines, index);
    }
    index--;

    rsp = labels;
/*
    let rsp = {
        annotations: labels
    }
*/
    return { rsp, index };
}

getJsonFromFile("reader.csv")

module.exports = { getJsonFromFile };