const fs = require("fs");
const csv = require("csv-parser");
const { resolve } = require("path");

function getJsonFromFile(file) {
  return new Promise((resolve, reject) => {
    const csvFilePath = `utils/Files/CSV/${file}`;
    const jsonObject = {
      title: ("", ""),
      subtitle: ("", ""),
      xAxis: [],
      yAxis: {},
      series: [],
    };

    let currentSeries = null;
    let yValues = [];
    let cValues = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv({ headers: false }))
      .on("data", (row) => {
        const key = row[0];
        const text = row[1];
        const align = row[2];

        if (key === "title") {
          jsonObject.title = { text, align };
        } else if (key === "subtitle") {
          jsonObject.subtitle = { text, align };
        } else if (key === "xAxis") {
          jsonObject.xAxis = {
            categories: JSON.parse(text),
          };
        } else if (key === "yAxis") {
          jsonObject.yAxis = {
            title: { text: text },
          };
        } else if (key === "name") {
          if (currentSeries) {
            jsonObject.series.push({
              name: currentSeries,
              data: yValues.slice(1), // Exclude the first null value
            });
            yValues = [];
          }
          currentSeries = text;
        } else if (currentSeries && row[2] !== undefined) {
          yValues.push(Number(row[1]));
        }
      })
      .on("end", () => {
        if (currentSeries) {
          jsonObject.series.push({
            name: currentSeries,
            data: yValues.slice(1), // Exclude the first null value
          });
        }
        console.log(JSON.stringify(jsonObject, null, 2));
        console.log("here");
        resolve(JSON.stringify(jsonObject, null, 2));
      });
  });
}
module.exports = { getJsonFromFile };
