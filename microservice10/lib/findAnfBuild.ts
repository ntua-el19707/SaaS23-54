import {
  ChartRecord,
  CollumnChart,
  LineAnnotations,
  LineAnnotationsBuild,
  NetworkChart,
  PollarChart,
  PollarSeries,
  dependencyWheelBuild,
  dependencyWheelChart,
  label,
  linesChart,
} from "./interfaces/sechema";
import {
  findChartLineAnnotion,
  findCollumn,
  findDependancyChart,
  findLine,
  findNetwork,
  findPollar,
} from "./mongo";

function findAndBuildLine(id: string): Promise<linesChart> {
  return new Promise((resolve, reject) => {
    findLine(id)
      .then((chart: ChartRecord) => {
        const lineOptions = chart.chart as linesChart;
        resolve(lineOptions);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
interface NetworkBuild {
  chart: {
    type: string;
    height: string;
  };
  title: label;
  subtitle?: label;
  plotOptions: {
    networkgraph: {
      keys: string[];
      layoutAlgorithm: {
        enableSimulation: boolean;
        friction: number;
      };
    };
  };
  series: {
    accessibility: {
      enabled: boolean;
    };
    dataLabels: {
      enabled: boolean;
      linkFormat: string;
    };
    id: string;
    data: [string, string][];
  }[];
}

function findAndBuilNetwork(id: string): Promise<NetworkBuild> {
  return new Promise((resolve, reject) => {
    findNetwork(id)
      .then((chart: ChartRecord) => {
        const networkOptions = chart.chart as NetworkChart;
        console.log(networkOptions);
        let data: NetworkBuild = {
          chart: {
            type: "networkgraph",
            height: "100%",
          },
          title: networkOptions.title,
          series: [
            {
              accessibility: {
                enabled: false,
              },
              dataLabels: {
                enabled: true,
                linkFormat: "",
              },
              id: "lang-tree",
              data: networkOptions.series,
            },
          ],
          plotOptions: {
            networkgraph: {
              keys: ["from", "to"],
              layoutAlgorithm: {
                enableSimulation: true,
                friction: -0.9,
              },
            },
          },
        };
        if (networkOptions.subtitle) {
          data.subtitle = networkOptions.subtitle;
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
interface PollarBuild {
  chart: {
    polar: boolean;
  };
  title: label;
  pane: {
    startAngle: number;
    endAngle: number;
  };
  xAxis: {
    tickInterval: number;
    min: number;
    max: number;
    labels: {
      format: string;
    };
  };
  plotOptions: {
    series: {
      pointStart: number;
      pointInterval: number;
    };
    column: {
      pointPadding: number;
      groupPadding: number;
    };
  };
  series: PollarSeries[];
  subtitle?: label;
}

function findAndBuildPollar(id: string): Promise<PollarBuild> {
  return new Promise((resolve, reject) => {
    console.log(`looking  For ${id}`);
    findPollar(id)
      .then((chart: ChartRecord) => {
        console.log(chart);
        const PollarOptions = chart.chart as PollarChart;

        let data: PollarBuild = {
          chart: {
            polar: true,
          },
          title: PollarOptions.title,
          pane: {
            startAngle: 0,
            endAngle: 360,
          },
          xAxis: {
            tickInterval: PollarOptions.plotOptions.iterval / 2,
            min: 0,
            max: 360,
            labels: {
              format: "{value}°",
            },
          },
          plotOptions: {
            series: {
              pointStart: PollarOptions.plotOptions.start,
              pointInterval: PollarOptions.plotOptions.iterval,
            },
            column: {
              pointPadding: 0,
              groupPadding: 0,
            },
          },
          series: PollarOptions.series,
        };
        if (PollarOptions.subtitle) {
          data.subtitle = PollarOptions.subtitle;
        }

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function findAndBuildCollumn(id: string): Promise<CollumnChart> {
  return new Promise((resolve, reject) => {
    console.log(`looking  For ${id}`);
    findCollumn(id)
      .then((chart: ChartRecord) => {
        console.log(chart);
        const collumn = chart.chart as CollumnChart;

        resolve(collumn);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function findAndBuildDependency(id: string): Promise<dependencyWheelBuild> {
  return new Promise((resolve, reject) => {
    console.log(`looking  For ${id}`);
    findDependancyChart(id)
      .then((chart: ChartRecord) => {
        console.log(chart);
        const DepentencyOptions = chart.chart as dependencyWheelChart;
        let dependencyWheel: dependencyWheelBuild = {
          accessibility: {
            point: {
              valueDescriptionFormat:
                "{index}. From {point.from} to {point.to}: {point.weight}.",
            },
          },
          title: DepentencyOptions.title,
          series: [
            {
              data: DepentencyOptions.series.data,
              keys: DepentencyOptions.series.keys,
              type: "dependencywheel",
              name: "Dependency wheel series",
              dataLabels: {
                color: "#333",
                style: {
                  textOutline: "none",
                },
                textPath: {
                  enabled: true,
                },
                distance: 10,
              },
              size: "95%",
            },
          ],
        };
        resolve(dependencyWheel);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function findAndBuildAnnotation(id: string): Promise<LineAnnotationsBuild> {
  return new Promise((resolve, reject) => {
    console.log(`looking  For ${id}`);
    findChartLineAnnotion(id)
      .then((chart: ChartRecord) => {
        console.log(chart);
        const options = chart.chart as LineAnnotations;
        let chartAnnotations: LineAnnotationsBuild = {
          chart: {
            type: "area",
            zoomType: "x",
            panning: true,
            panKey: "shift",
            scrollablePlotArea: {
              minWidth: 600,
            },
          },
          title: options.title,
          series: [
            {
              data: options.series[0].data,
              //lineColor: Highcharts.getOptions().colors[1],
              //color: Highcharts.getOptions().colors[2],
              fillOpacity: 0.5,
              name: "Elevation",
              marker: {
                enabled: false,
              },
              threshold: null,
            },
          ],
          annotations: {
            draggable: "",
            labelOptions: {
              backgroundColor: "rgba(255,255,255,0.5)",
              verticalAlign: "top",
              y: 15,
            },
            labels: options.annotations.labels,
          },
          xAxis: {
            labels: {
              format: "{value} km",
            },
            minRange: 5,
            title: {
              text: "Distance",
            },
          },

          yAxis: {
            startOnTick: true,
            endOnTick: false,
            maxPadding: 0.35,
            title: {
              text: "",
            },
            labels: {
              format: "{value} m",
            },
          },
          legend: {
            enabled: false,
          },
        };
        if (options.subtitle) {
          chartAnnotations.subtitle = options.subtitle;
        }
        resolve(chartAnnotations);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function FindPreview(
  id: string
): Promise<
  | linesChart
  | LineAnnotationsBuild
  | NetworkBuild
  | PollarBuild
  | dependencyWheelBuild
  | CollumnChart
> {
  return new Promise((resolve, reject) => {
    const size = id.length;
    switch (size) {
      case 7:
        findAndBuildLine(id)
          .then((line: linesChart) => {
            resolve(line);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case 8:
        findAndBuilNetwork(id)
          .then((network: NetworkBuild) => {
            console.log(JSON.stringify(network));
            resolve(network);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case 9:
        findAndBuildPollar(id)
          .then((Pollar: PollarBuild) => {
            resolve(Pollar);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case 10:
        findAndBuildDependency(id)
          .then((chart: dependencyWheelBuild) => {
            resolve(chart);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case 11:
        findAndBuildCollumn(id)
          .then((chart: CollumnChart) => {
            resolve(chart);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      case 12:
        findAndBuildAnnotation(id)
          .then((chart: LineAnnotationsBuild) => {
            resolve(chart);
          })
          .catch((err) => {
            reject(err);
          });
        break;
      default:
        reject("not such diagram type");
        break;
    }
  });
}
