const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const makeid = require("../genaratorString");
const path = require("path");
const { buildDependancyWheelOptions } = require("../buildFunctions/dataBuild");
function createChart(chartoptions) {
  return new Promise((resolve, reject) => {
   
    var exportSettings = {
      type: "png",
      options: buildDependancyWheelOptions(chartoptions),
    };
    //Set up a pool of PhantomJS workers
    chartExporter.initPool();

    //Perform an export
    /*
    Export settings corresponds to the available CLI arguments described
    above.
*/
    chartExporter.export(exportSettings, function (err, res) {
      //The export result is now in res.
      //If the output is not PDF or SVG, it will be base64 encoded (res.data).
      //If the output is a PDF or SVG, it will contain a filename (res.filename).
      if (err) {
        console.log(err);
        reject(err);
      }
      //Kill the pool when we're done with it, and exit the application
      // Get the image data (base64)
      let imageb64 = res.data;

      chartExporter.killPool();
      resolve(imageb64);
    });
  });
}

function svgChart(chartoptions) {
  return new Promise((resolve, reject) => {
    var exportSettings = {
      type: "svg",
      outfile: `utils/Files/svg/DependancyWheel${makeid(8)}.svg`,
      options: buildDependancyWheelOptions(chartoptions),
    };
    //Set up a pool of PhantomJS workers
    chartExporter.initPool();

    //Perform an export
    /*
    Export settings corresponds to the available CLI arguments described
    above.
*/
    chartExporter.export(exportSettings, function (err, res) {
      //The export result is now in res.
      //If the output is not PDF or SVG, it will be base64 encoded (res.data).
      //If the output is a PDF or SVG, it will contain a filename (res.filename).
      if (err) {
        console.log(err);
        reject(err);
      }
      //Kill the pool when we're done with it, and exit the application
      // Get the image data (base64)

      chartExporter.killPool();
      resolve(res.filename);
    });
  });
}
function pdfChart(chartoptions) {
  return new Promise((resolve, reject) => {
    var exportSettings = {
      type: "pdf",
      outfile:`utils/Files/pdf/DependancyWheel${makeid(9)}.pdf`,
      options: buildDependancyWheelOptions(chartoptions),
    };
    //Set up a pool of PhantomJS workers
    chartExporter.initPool();

    //Perform an export
    /*
    Export settings corresponds to the available CLI arguments described
    above.
*/
    chartExporter.export(exportSettings, function (err, res) {
      //The export result is now in res.
      //If the output is not PDF or SVG, it will be base64 encoded (res.data).
      //If the output is a PDF or SVG, it will contain a filename (res.filename).
      if (err) {
        console.log(err);
        reject(err);
      }
      //Kill the pool when we're done with it, and exit the application
      // Get the image data (base64)

      chartExporter.killPool();
      resolve(res.filename);
    });
  });
}
function createHtml(options) {
  return new Promise((resolve, reject) => {
    let line = buildDependancyWheelOptions(options);
    line.chart = {
      scrollablePlotArea: {
        minWidth: 700,
      },
    };
    const filename =`chart${makeid(7)}.html` ;
    let htmlpath = path.join(__dirname, "../../Files/html/", filename);
 //TODO copy html code 
    fs.writeFileSync(
      htmlpath,

    );
    resolve(`/utils/Files/html/${filename}`);
  });
}
module.exports = { createChart, svgChart, pdfChart, createHtml };
