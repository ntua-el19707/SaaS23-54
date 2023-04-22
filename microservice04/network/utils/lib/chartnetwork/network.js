const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const makeid = require("../genaratorString");
const path = require("path");
const { buildnetworkOptions } = require("../buildFunctions/dataBuild");
function createChart(chartoptions) {
  return new Promise((resolve, reject) => {
    var exportSettings = {
      type: "png",
      options: buildnetworkOptions(chartoptions, false),
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
      outfile: `utils/Files/svg/network${makeid(8)}.svg`,
      options: buildnetworkOptions(chartoptions, true),
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
      outfile: `utils/Files/pdf/network${makeid(9)}.pdf`,
      options: buildnetworkOptions(chartoptions, false),
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
    let line = buildnetworkOptions(options, true);

    const filename = `chart${makeid(7)}.html`;
    let htmlpath = path.join(__dirname, "../../Files/html/", filename);

    fs.writeFileSync(
      htmlpath,
      `<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/networkgraph.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
     
    </p>
</figure>
<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }

    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>

<script>// A point click event that uses the Renderer to draw a label next to the point
    // On subsequent clicks, move the existing label instead of creating a new one.

    Highcharts.chart('container', 


        ${JSON.stringify(line)}

    );</script>`
    );
    resolve(`/utils/Files/html/${filename}`);
  });
}
module.exports = { createChart, svgChart, pdfChart, createHtml };
