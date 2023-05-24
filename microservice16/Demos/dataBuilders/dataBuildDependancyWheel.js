//Build json file for Dependancy Wheel Options using csv

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
    if(field === "title"){
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
  //json.series = series;
  console.log(json.series.keys);
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


//Build Dependancy Wheel Options using json


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
    name: 'Dependency wheel series',
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

module.exports = { csvJSON, buildDependancyWheelOptions };
