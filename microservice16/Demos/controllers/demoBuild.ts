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
  csvData: string;
  jsonChart: any;
}

const getDependancyWheel = (req: Request, res: Response) => {
  findDemos("DependancyWheelDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        let json = csvJSONDependancyWheel(data);
        let jsonChart = buildDependancyWheelOptions(json);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
          jsonChart: jsonChart,
        };
        demoArray.push(demo);
      });
      return demoArray;
    })
    .catch((error) => {
      console.log("Error:", error);
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
        let json = csvJSONPolar(data);
        let jsonChart = buildPolarOptions(json);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
          jsonChart: jsonChart,
        };
        demoArray.push(demo);
      });
      return demoArray;
    })
    .catch((error) => {
      console.log("Error:", error);
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
        console.log(data);
        let json = csvJSONLinewithAnnotations(data);
        let jsonChart = buildLinewithAnnotationsOptions(json);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
          jsonChart: jsonChart,
        };
        demoArray.push(demo);
      });
      return demoArray;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getNetwork = (req: Request, res: Response) => {
  findDemos("NetworkDemo")
    .then((filenameArray) => {
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        let json = csvJSONNetwork(data);
        let jsonChart = buildNetworkOptions(json, true);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
          jsonChart: jsonChart,
        };
        demoArray.push(demo);
      });
      return demoArray;
    })
    .catch((error) => {
      console.log("Error:", error);
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
        let json = csvJSONLine(data);
        let jsonChart = buildLineOptions(json);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
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
      const filenames = filenameArray as string[];
      let demoArray: demoObject[] = [];
      filenames.forEach((filename) => {
        const filePath = path.join(__dirname, "../utils/Files/csv/", filename);
        //const filePath =`../utils/Files/CSV/${filename}` ;
        const data = readFileSync(filePath, { encoding: "utf8", flag: "r" });
        console.log(data);
        let json = csvJSONColumn(data);
        let jsonChart = buildColumnOptions(json);
        let demo: demoObject = {
          filename: filename,
          csvData: data,
          jsonChart: json,
        };
        demoArray.push(demo);
      });
      return demoArray;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

export {
  getDependancyWheel,
  getPolar,
  getLinewithAnnotations,
  getNetwork,
  getLine,
  getColumn,
};
