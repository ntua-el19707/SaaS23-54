function buildNetworkOptions(data, anim) {
  let options = {};
  //console.log(anim);
  options.chart = {
    type: "networkgraph",
    height: "100%",
  };
  data = data;
  console.log(data.title);
  if (data.title) {
    options.title = {};
    if (data.title.text) {
      options.title.text = data.title.text;
    }
    if (data.title.align) {
      options.title.align = data.title.align;
    }
  }
  if (data.Subtitle) {
    options.subtitle = {};
    if (data.Subtitle.text) {
      options.subtitle.text = data.Subtitle.text;
    }
    if (data.Subtitle.align) {
      options.subtitle.align = data.Subtitle.align;
    }
  }
  let series = {
    accessibility: {
      enabled: false,
    },
    dataLabels: {
      enabled: true,
      linkFormat: "",
    },
    id: "lang-tree",
  };
  if (data.series) {
    if (data.series.data) {
      series.data = data.series.data;
    }
  }
  options.plotOptions = {
    networkgraph: {
      keys: ["from", "to"],
    },
  };
  if (anim) {
    options.plotOptions.networkgraph.layoutAlgorithm = {
      enableSimulation: true,
      friction: -0.9,
    };
  }
  options.series = [series];

  return options;
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

module.exports = { buildNetworkOptions, csvJSON };
