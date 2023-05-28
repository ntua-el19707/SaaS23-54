/**
 * module reader.js
 * @author  el18716
 *
 */

const { readFileSync, unlinkSync } = require("fs");
const pathM = require("path");
const { stringify } = require("querystring");


/**
 * function readCsv
 * @param FileName String
 * @returns file context
 */
function readCsv(FileName) {
  const path =`utils/Files/CSV/${FileName}` ;
  //const path =`./${FileName}` ;

  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  //console.log(data)
  return data;

}

const valid_2 = ["title"];

function csvJSON(csv) {
  let json = {}; 
  //TODO implement reading stragtegy
  const lines = csv.split("\n");
  //let series = [];
  json.series = [];
  
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
      json.series = out;
      break;
    }
    else {
      //wrong input
      break;
    }
  }
  console.log((stringify(json)));   
  return json;
}

function readFields(line, data) {
  //console.log(data);
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
  //skip name line
  index++;
  let name = lines[index++].split("\r")[0].split(",");
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
    if(data0[0]===""){
      break;
    }
    data0[2] = parseFloat(data0[2]);
    dataArray.push(data0);
    index++;
  }
  console.log(dataArray)

  const series = {
    name: name,
    keys: fields,
    data: dataArray
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

/*
let filename = "reader.csv"
getJsonFromFile(filename)
*/



function buildDependancyWheelOptions(data) {
  let options = {
  };

  if (data.title) {
    options.title = {};
    if (data.title.text) {
        options.title.text = data.title.text;
    }
  };

  options.accessibility = {
    point: {
      valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
    }
  };

  options.series =[ {
    keys: data.series.keys,
    data: data.series.data,
    type: 'dependencywheel',
    name: data.series.name,
    dataLabels: {
      color: '#333',
      style: {
        textOutline: 'none'
      },
      textPath: {
        enabled: true
      },
      distance: 10
    },
    size: '95%'
  }]

  



  //TODO  impment  options  builder
  return options;
}

module.exports = { getJsonFromFile, destroy };