const { json } = require("body-parser");
const { buildSeries } = require("./buildSeries");

function buildLineOptions(data) {
  data.series = buildSeries(data.series);
  // console.log(JSON.stringify(data.data));
  let series = [];

  data.series.forEach((s) => {
    series.push({
      type: "line",
      data: s.data,
      name: s.name,
    });
  });
  let options = {
    title: data.title,

    series: series,
  };
  if (data.Subtitle) {
    options.subtitle = data.Subtitle;
  }
  if (data.Xaxis) {
    options.xAxis = {};

    let title = {};
    if (data.Xaxis.text) {
      title.text = data.Xaxis.text;
      options.xAxis.title = title;
    }

    if (data.Xaxis.format) {
      options.xAxis.format = `'value:${data.Xaxis.format}'`;
    }
  }
  if (data.Yaxis) {
    let title = {};
    options.yAxis = {};
    if (data.Yaxis.text) {
      title.text = data.Yaxis.text;
      options.yAxis.title = title;
    }

    if (data.Yaxis.format) {
      options.yAxis.format = `'value:${data.Yaxis.format}'`;
    }
  }
  return options;
}
module.exports = { buildLineOptions };
