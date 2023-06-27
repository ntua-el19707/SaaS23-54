import { NextFunction, Request, Response } from "express";

import { findDemos } from "../utils/lib/mongo";

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
  csvData: string [] [];
  jsonChart: any;
}

const getDependancyWheel = (req: Request, res: Response) => {
  console.log("trying to find")
  findDemos("DependancyWheelDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      console.log(filenames);
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        console.log(data);
        const { data: dataArray, columnCount } = parseCSV(data);
        console.log("parsed");
        let json = csvJSONDependancyWheel(data);
        console.log("After" + json);
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getPolar = (req: Request, res: Response) => {
  findDemos("PolarDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        const { data: dataArray, columnCount } = parseCSV(data);
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getLinewithAnnotations = (req: Request, res: Response) => {
  findDemos("LinewithAnnotationsDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      console.log(filenames);
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        console.log(filePath);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        //console.log("data");
        const { data: dataArray, columnCount } = parseCSV(data);
        /*console.log("max columns " + columnCount);
        for (const row of dataArray) {
          console.log(row);
        }*/
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getNetwork = (req: Request, res: Response) => {
  findDemos("NetworkDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      console.log(filenames);
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        console.log(data);
        const { data: dataArray, columnCount } = parseCSV(data);
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getLine = (req: Request, res: Response) => {
  console.log(req);
  findDemos("LineDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        const { data: dataArray, columnCount } = parseCSV(data);
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getColumn = (req: Request, res: Response) => {
  findDemos("ColumnDemo")
    .then((filenameArray) => {
      console.log(filenameArray);
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        //const filePath =`../utils/Files/CSV/${filename}` ;
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        const { data: dataArray, columnCount } = parseCSV(data);
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
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

function parseCSV(csvString: string): { data: string[][], columnCount: number } {
  const lines = csvString.split(/\r\n|\n/);
  const result: string[][] = [];
  let maxColumnCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const fields = spliter(lines, i);
    result.push(fields);
    maxColumnCount = Math.max(maxColumnCount, fields.length);
  }

  return { data: result, columnCount: maxColumnCount };
}

function spliter(lines: string[], index: number): string[] {
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

export {
  getDependancyWheel,
  getPolar,
  getLinewithAnnotations,
  getNetwork,
  getLine,
  getColumn,
};
