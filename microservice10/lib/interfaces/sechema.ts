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
export interface ChartRecord {
  chart: linesChart | NetworkChart | PollarChart;
  ownerShip: string;
  createAT: string;
}
