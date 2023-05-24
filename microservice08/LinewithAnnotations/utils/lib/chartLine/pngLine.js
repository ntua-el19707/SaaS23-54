const fs = require("fs");

const path = require("path");
const puppeteer = require("puppeteer");

// Alternatively, this is how to load Highcharts Stock. The Maps and Gantt
// packages are similar.

const { buildDependancyWheelOptions } = require("../buildFunctions/dataBuild");
const { makeid } = require("../genaratorString");

function buildAll(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const chartOptions = buildDependancyWheelOptions(options);

      const html = getHtml(chartOptions); //now  i have ready the html
      console.log(JSON.stringify(chartOptions))
      //* From  Html  i will produce  the  remaining 3
      //& all the charts  will be save with same name so let create it

      const timestamp = Date.now();
      const unique_name = makeid(5);
      const file_id = `${unique_name}_${timestamp}`; //donwload_file_id
      //& downnload mechanism will work idChart => file_id  => send file_id

      // create  the folder paths ;
      const downloadFolder = path.join(__dirname, "../../Files");

      const html_path = `${downloadFolder}/html/${file_id}.html`;
      const svg_path = `${downloadFolder}/svg/${file_id}.svg`;
      const pdf_path = `${downloadFolder}/pdf/${file_id}.pdf`;
      const png_path = `${downloadFolder}/png/${file_id}.png`;
      //* Note  after in docker i have to finf how to make downlaod container public storage the same upload
      //& meaning now  i building consider that pr will work intire  in  one machine

      //html  save ;
      fs.writeFileSync(html_path, getHtml(chartOptions));

      //now  we are gone  lunch puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(html);
      await page.emulateMediaType("screen");
      await page.setViewport({ width: 600, height: 400 });
      setTimeout(() => {
        Promise.all([
          buildPdf(page, pdf_path),
          buildPng(page, png_path),
          buildSvg(page, svg_path),
        ])
          .then(async () => {
            await browser.close();

            resolve(file_id);
          })
          .catch(async (err) => {
            await browser.close();
            reject(err);
          });
      }, 1000);

      //now  the chart  is  ready  to be exported to the  other types
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * function  getHtml  -'get html document for a sepecific chart '
 * @param {*} chartOptions chart options Pollar
 */
function getHtml(chartOptions) {
  const html = `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/sankey.js"></script>
    <script src="https://code.highcharts.com/modules/dependency-wheel.js"></script>
    
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <style>
        .highcharts-figure,
        .highcharts-data-table table {
            min-width: 320px;
            max-width: 660px;
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
</head>

<body>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
        </p>

    </figure>
</body>
<script>

    Highcharts.chart('container', ${JSON.stringify(chartOptions)});

</script>
<footer>

</footer>

</html>`;
  return html;
}
/**
 * function  buildSvg - build and save svg
 * @param {*} page puppeteer.lunch.newpage()
 * @param {*} filename string
 * @returns
 */
function buildSvg(page, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      await page.waitForSelector("#container svg");

      // Get the SVG element from the page source
      const svg = await page.$eval("#container svg", (el) => el.outerHTML);

      fs.writeFileSync(filename, svg);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * function  buildPdf - build and save pdf
 * @param {*} page puppeteer.lunch.newpage()
 * @param {*} filename string
 * @returns
 */
function buildPdf(page, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      await page.pdf({
        path: `${filename}`,
        margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
        printBackground: true,
        format: "A4",
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * function  buildPng - build and save png
 * @param {*} page puppeteer.lunch.newpage()
 * @param {*} filename string
 * @returns
 */
function buildPng(page, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      await page.screenshot({ path: `${filename}` });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = { buildAll };
