const { buildSeries } = require("./buildSeries");
function buildPollarOptions(data) {
  data = data;

  let options = {
    chart: {
      polar: true,
    },
  };

  data.plotOptions = buildPlot(data.plotOptions);
  data.series = buildSeries(data.series);
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
  options.pane = {
    startAngle: 0,
    endAngle: 360,
  };
  options.xAxis = {
    tickInterval: data.plotOptions.iterval / 2,
    min: 0,
    max: 360,
    labels: {
      format: "{value}°",
    },
  };
  options.plotOptions = {
    series: {
      pointStart: data.plotOptions.start,
      pointInterval: data.plotOptions.iterval,
    },
    column: {
      pointPadding: 0,
      groupPadding: 0,
    },
  };
  options.series = data.series;
  return options;
}
function buildPlot(options) {
  options.start = parseFloat(options.start);
  options.iterval = parseFloat(options.iterval);
  return options;
}
module.exports = { buildPollarOptions };
