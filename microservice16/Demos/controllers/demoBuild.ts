import { NextFunction, Request, Response } from "express";

import {
  csvJSON as csvJSONDependancyWheel,
  buildDependancyWheelOptions,
} from "../dataBuilders/dataBuildDependancyWheel";

import {
  csvJSON as csvJSONPolar,
  buildPolarOptions,
} from "../dataBuilders/dataBuildPolar";

import {
  csvJSON as csvJSONLinewithAnnotations,
  buildLinewithAnnotationsOptions,
} from "../dataBuilders/dataBuildLinewithAnnotations";

import {
  csvJSON as csvJSONNetwork,
  buildNetworkOptions,
} from "../dataBuilders/dataBuildNetwork";

import {
  csvJSON as csvJSONLine,
  buildLineOptions,
} from "../dataBuilders/dataBuildLine";

import {
  getJsonFromCSVString as csvJSONColumn,
  buildColumnOptions,
} from "../dataBuilders/dataBuildColumn";

const path = require("path");

import { readFileSync } from "fs";

interface demoObject {
  filename: string;
  max_columns: number;
  csvData: string[][];
  jsonChart: any;
}

let lineDemoArray = ["lineDemo1.csv", "lineDemo2.csv", "lineDemo3.csv", "lineDemo4.csv", "lineDemo5.csv"]
let linewithannotationsDemoArray = ["linewithannotationsDemo1.csv", "linewithannotationsDemo2.csv", "linewithannotationsDemo3.csv", "linewithannotationsDemo4.csv", "linewithannotationsDemo5.csv"];
let columnDemoArray = ["columnDemo1.csv", "columnDemo2.csv", "columnDemo3.csv", "columnDemo4.csv", "columnDemo5.csv"];
let networkDemoArray = ["networkDemo1.csv", "networkDemo2.csv", "networkDemo3.csv", "networkDemo4.csv", "networkDemo5.csv"];
let polarDemoArray = ["polarDemo1.csv", "polarDemo2.csv", "polarDemo3.csv", "polarDemo4.csv", "polarDemo5.csv"];
let dependancywheelDemoArray = ["dependancywheelDemo1.csv", "dependancywheelDemo2.csv", "dependancywheelDemo3.csv", "dependancywheelDemo4.csv", "dependancywheelDemo5.csv"];




const getDependancyWheel = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  dependancywheelDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    //console.log(data);
    const { rsp: dataArray, max: columnCount } = csvTables(data);
    let json = csvJSONDependancyWheel(data);
    let jsonChart = buildDependancyWheelOptions(json);
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });
};

const getPolar = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  polarDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    const { rsp: dataArray, max: columnCount } = csvTables(data);
    let json = csvJSONPolar(data);
    let jsonChart = buildPolarOptions(json);
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });

};

const getLinewithAnnotations = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  linewithannotationsDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    console.log(filePath);
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    //console.log("data");
    const { rsp: dataArray, max: columnCount } = csvTables(data);
   
    let json = csvJSONLinewithAnnotations(data);
    let jsonChart = buildLinewithAnnotationsOptions(json);
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });
};

const getNetwork = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  networkDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    console.log(data);
    const { rsp: dataArray, max: columnCount } = csvTables(data);
    let json = csvJSONNetwork(data);
    let jsonChart = buildNetworkOptions(json, true);
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });
};

const getLine = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  lineDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    const { rsp: dataArray, max: columnCount } = csvTables(data);
    let json = csvJSONLine(data);
    let jsonChart = buildLineOptions(json);
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });

};

const getColumn = (req: Request, res: Response) => {

  let demoArray: demoObject[] = [];
  columnDemoArray.forEach((filename) => {
    const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
    //const filePath =`../utils/Files/CSV/${filename}` ;
    const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    const { data: dataArray, columnCount: columnCount } = parseCSV(data);
    console.log(data);
    let json = csvJSONColumn(data);
    //console.log(json);
    let jsonChart = buildColumnOptions(json);
    console.log("bonjour")
    let demo: demoObject = {
      filename: filename,
      max_columns: columnCount,
      csvData: dataArray,
      jsonChart: jsonChart,
    };
    demoArray.push(demo);
  });
  res.status(200).json({ demoArray });

};


function parseCSV(csvString: string): { data: string[][], columnCount: number } {
  const lines = csvString.split(/\r\n|\n/);
  const result: string[][] = [];
  let maxColumnCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const fields = spliter2(lines, i);
    result.push(fields);
    maxColumnCount = Math.max(maxColumnCount, fields.length);
  }

  return { data: result, columnCount: maxColumnCount };
}

function spliter2(lines: string[], index: number): string[] {
  let fields = lines[index].split("\r")[0].split(",");
  fields = fields.filter(function (e) {
    return e.split(/(\r\n|\n|\r)/gm).join("");
  });
  let rsp: string[] = [];
  fields.forEach((e) => {
    rsp.push(e.split(/\s/).join(""));
  });

  return rsp;
}



function csvTables(csv) {
  const lines = csv.split("\n");
  let max = 0;
  let rsp = [];
  for (let i = 0; i < lines.length; i++) {
    let row = spliter(lines, i);
    rsp.push(row);
    if (row.length > max) {
      max = row.length;
    }
  }
  for (let i = 0; i < rsp.length; i++) {
    while (rsp[i].length < max) {
      rsp[i].push(",");
    }
  }

  return {rsp, max};
}

function spliter(lines, index) {
  let fields = lines[index].split("\r")[0].split(",");

  return fields;
}


export {
  getDependancyWheel,
  getPolar,
  getLinewithAnnotations,
  getNetwork,
  getLine,
  getColumn,
};
