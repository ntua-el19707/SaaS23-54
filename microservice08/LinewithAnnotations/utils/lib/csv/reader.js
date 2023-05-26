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
    const path = `./${FileName}`;

  //const path = `utils/Files/CSV/${FileName}`;

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
  try {
    const valid = ["subtitle", "title"];
    let json = {};
    let lines = csv.split("\n");
    //console.log(lines)
    let index = 0;
    let size = lines.length;
    json.series = [];

    json.annotations = {};
    json.annotations.labels = [];

    json.xAxis = {};
    json.yAxis = {};

    json.title = {};

    while (index < size) {
      let field = spliter(lines, index)[0];
      console.log(field);
      if (field === "series") {
        let data = readSeries(lines, index + 1);
        //console.log(data.rsp);
        console.log(`data from serires ${JSON.stringify(data)}`);
        json.series.push({ data: data.rsp });
        index = data.index;
      } else if (field === "annotations") {
        const data = readAnnotations(lines, index + 1);
        json.annotations.labels = data.rsp;
        index = data.index;
      } else if (valid.includes(field)) {
        console.log(lines[index + 1]);
        console.log("aris");
        const data = readFields(lines, index + 1);
        json.title = data;
        index += 2;
      } else if (field === "xAxis") {
        console.log(lines[index + 1]);
        const data = readxAxis(lines, index + 1);
        index = data.index;
        json.xAxis = data.json;
      } else if (field === "yAxis") {
        console.log(lines[index + 1]);
        const data = readyAxis(lines, index + 1);
        json.yAxis = data.json;
        index = data.index;
      }
      ++index;
    }

    //console.log(json.series.data);
    //console.log(json.annotations.labels);
    //console.log(JSON.stringify(json));
    console.log(json.xAxis);
    console.log(json.yAxis);
    console.log(json.title)

    return json;
  } catch (err) {
    throw err;
  }
}
function getJsonFromFile(file) {
  try {
    let data = readCsv(file);
    return csvJSON(data);
  } catch (err) {
    throw err;
  }
}
/**readSeries - read series
 * @params lines array
 * @params index number
 */
function readSeries(lines, index) {
  try {
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
      data: elevation_data,
    };

    return { rsp, index };
  } catch (err) {
    throw err;
  }
}
/**
 * readFields -return normal fields data
 * @param {*} line array
 * @param {*} index number
 * @returns json object
 */
function readFields(lines, index) {
    
    index++
    let data = spliter(lines, index);
    title_text = data[0];
    title_alignment = data[1];

    json = {
        text: title_text,
        align: title_alignment
    }
    return json;
}

function readAnnotations(lines, index) {
  try {
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
          xAxis: parseFloat(xAxis),
          yAxis: parseFloat(yAxis),
          x: parseFloat(data[2]),
          y: parseFloat(data[3]),
        },
        text: data[4],
      };
      labels.push(label);
      console.log("try here:" + label.point.y);

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
  } catch (err) {
    throw err;
  }
}

function readxAxis(lines, index) {
  try {
    const size = lines.length;
    ++index;
    let xAxis_format = spliter(lines, index);
    ++index;
    ++index;
    let xAxis_title = spliter(lines, index);
    if (xAxis_title[0] === "null") xAxis_title[0] = null;
    ++index;
    ++index;
    let xAxis_range = spliter(lines, index);
    let json = {
      labels: {
        format: "{value} " + xAxis_format[0],
      },
      minRange: 5,
      title: {
        text: xAxis_title[0],
      },
      accessibility: {
        rangeDescription:
          "Range: " +
          xAxis_range[0] +
          " to " +
          xAxis_range[1] +
          xAxis_format[0],
      },
    };

    return { json, index };
  } catch (err) {
    throw err;
  }
}

function readyAxis(lines, index) {
  try {
    const size = lines.length;
    ++index;
    let yAxis_format = spliter(lines, index);
    ++index;
    ++index;
    let yAxis_title = spliter(lines, index);
    if (yAxis_title[0] === "null") yAxis_title[0] = null;
    ++index;
    ++index;
    let yAxis_range = spliter(lines, index);
    let json = {
      startOnTick: true,
      endOnTick: false,
      maxPadding: 0.35,

      title: {
        text: yAxis_title[0],
      },

      labels: {
        format: "{value} " + yAxis_format[0],
      },
      minRange: 5,
      title: {
        text: yAxis_title[0],
      },
      accessibility: {
        rangeDescription:
          "Range: " +
          yAxis_range[0] +
          " to " +
          yAxis_range[1] +
          yAxis_format[0],
      },
    };

    return { json, index };
  } catch (err) {
    throw err;
  }
}

function destroyCSV(filename) {
  const path = `utils/Files/CSV/${filename}`;
  try {
    unlinkSync(path);
    console.log("delete " + path);
    return true;
  } catch (err) {
    return false;
  }
}

let filename = "reader.csv"
getJsonFromFile(filename)

module.exports = { getJsonFromFile, destroyCSV };