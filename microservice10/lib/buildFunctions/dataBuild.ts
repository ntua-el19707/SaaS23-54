import { buildPollarSeries, buildSeries } from "./buildSeries";
//i have  copy form  th js files  for spymplicity i will not impemnet the iterfaces and i set types to any
//this  file  will contain all the vuilding algorythms
function buildLineOptions(data: any) {
  data.series = buildSeries(data.series);
  // console.log(JSON.stringify(data.data));
  let series: any[] = [];

  data.series.forEach((s: any) => {
    series.push({
      type: "line",
      data: s.data,
      name: s.name,
    });
  });
  let options: any = {
    title: data.title,

    series: series,
  };
  if (data.Subtitle) {
    options.subtitle = data.Subtitle;
  }
  if (data.Xaxis) {
    options.xAxis = {};

    let title: any = {};
    if (data.Xaxis.text) {
      title.text = data.Xaxis.text;
      options.xAxis.title = title;
    }

    if (data.Xaxis.format) {
      options.xAxis.format = `'value:${data.Xaxis.format}'`;
    }
  }
  if (data.Yaxis) {
    let title: any = {};
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
function buildnetworkOptions(data: any, anim: boolean) {
  let options: any = {};
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
  let series: any = {
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
function buildPollarOptions(data: any) {
  let options: any = {};

  options.chart = {
    polar: true,
  };
  data.plotOptions = buildPlot(data.plotOptions);
  data.series = buildPollarSeries(data.series);
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
function buildPlot(options: any): any {
  options.start = parseFloat(options.start);
  options.iterval = parseFloat(options.iterval);
  return options;
}
export { buildLineOptions, buildnetworkOptions, buildPollarOptions };
