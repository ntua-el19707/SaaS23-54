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
    Categories?: any[];
  };
  yAxis?: {
    title?: label;
  };
  series: { name: string; data: any[] }[];
}
export interface ChartRecord {
  chart:
    | linesChart
    | NetworkChart
    | PollarChart
    | CollumnChart
    | dependencyWheelChart
    | LineAnnotations;
  ownerShip: string;
  createAT: string;
}
export interface LineAnnotations {
  title: label;
  subtitle?: label;
  xAxis: {
    labels?: {
      format: string;
    };
    minRange?: number;
    title: {
      text: string;
    };
  };
  yAxis: {
    startOnTick: boolean;
    endOnTick: boolean;
    maxPadding: number;
    title: {
      text: string;
    };
    labels?: {
      format: string;
    };
  };
  annotations: {
    labels: {
      point: {
        xAxis: number;
        yAxis: number;
        x: number;
        y: number;
      };
      text: string;
    }[];
  };
  series: {
    data: [number, number][];
    name: string;
  }[];
  _id: string;
}
export interface LineAnnotationsBuild {
  chart: {
    type: string;
    zoomType: string;
    panning: boolean;
    panKey: string;
    scrollablePlotArea: {
      minWidth: number;
    };
  };
  title: label;
  subtitle?: label;

  series: {
    data: [number, number][];
    fillOpacity: number;
    name: string;
    marker: {
      enabled: boolean;
    };
    threshold: null;
  }[];
  annotations: {
    draggable: string;
    labelOptions: {
      backgroundColor: string;
      verticalAlign: string;
      y: number;
    };
    labels: {
      point: {
        xAxis: number;
        yAxis: number;
        x: number;
        y: number;
      };
      text: string;
    }[];
  };
  xAxis: {
    labels?: {
      format: string;
    };
    minRange: number;
    title: {
      text: string;
    };
  };
  yAxis: {
    startOnTick: boolean;
    endOnTick: boolean;
    maxPadding: number;
    title: {
      text: string;
    };
    labels?: {
      format: string;
    };
  };
  legend: {
    enabled: boolean;
  };
}
