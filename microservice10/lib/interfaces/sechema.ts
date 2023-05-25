export interface label {
  text: string;
  align: string;
}
interface lineSeries {
  name: string;
  data: ([string, string] | [number, number])[];
}
export interface PollarSeries {
  name: string;
  type: string;
  data: number[];
}
export interface dependencyWheelChart {
  series: { keys: string[]; data: [string, string, number][]; name: string };

  title: label;
  subtitle?: string;
  _id: string;
}
export interface dependencyWheelBuild {
  title: label;
  subtitle?: string;
  series: {
    keys: string[];
    data: [string, string, number][];
    type: string;
    name: string;
    dataLabels: {
      color: string;
      style: {
        textOutline: string;
      };
      textPath: {
        enabled: boolean;
      };
      distance: number;
    };
    size: string;
  }[];
  accessibility: {
    point: {
      valueDescriptionFormat: string;
    };
  };
}
export interface linesChart {
  _id: string;
  title: label;
  subtitle?: label;
  yAxis?: {
    title?: label;
  };
  xAxis?: {
    title?: label;
  };
  series: lineSeries[];
}
export interface NetworkChart {
  _id: string;
  title: label;
  subtitle?: label;
  series: [string, string][];
}
export interface PollarChart {
  _id: string;
  title: label;
  subtitle?: label;
  series: PollarSeries[];
  plotOptions: {
    start: number;
    iterval: number;
  };
}
export interface CollumnChart {
  _id: string;
  title: label;
  subtitle?: label;
  xAxis?: {
    title?: label;
    Categories?: any[];
  };
  yAxis?: {
    title?: label;
    Categories?: any[];
  };
  series: { name: string; data: any[] }[];
}
export interface ChartRecord {
  chart:
    | linesChart
    | NetworkChart
    | PollarChart
    | CollumnChart
    | dependencyWheelChart;
  ownerShip: string;
  createAT: string;
}
