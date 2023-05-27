function buildLineAnnotationsOptions(data) {
  data = data;
  const series = data.series;

  let options = {
    chart: {
      type: "area",
      zoomType: "x",
      panning: true,
      panKey: "shift",
      scrollablePlotArea: {
        minWidth: 600,
      },
    },
  };
  options.series = [];
  series.forEach((s) => {
    options.series.push({
      data: s.data,
      //lineColor: Highcharts.getOptions().colors[1],
      //color: Highcharts.getOptions().colors[2],
      fillOpacity: 0.5,
      name: s.name,
      marker: {
        enabled: false,
      },
      threshold: null,
    });
  });

  options.annotations = {
    draggable: "",
    labelOptions: {
      backgroundColor: "rgba(255,255,255,0.5)",
      verticalAlign: "top",
      y: 15,
    },
    labels: data.annotations.labels,
  };

  options.title = data.title;

  options.xAxis = data.xAxis;

  options.yAxis = data.yAxis;

  options.legend = {
    enabled: false,
  };

  return options;
}

module.exports = { buildLineAnnotationsOptions };
