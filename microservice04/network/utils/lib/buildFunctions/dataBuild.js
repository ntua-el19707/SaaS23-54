function buildnetworkOptions(data, anim) {
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
module.exports = { buildnetworkOptions };
