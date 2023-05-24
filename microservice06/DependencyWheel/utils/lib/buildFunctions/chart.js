const { getJsonFromFile } = require('../csv/reader.js');
const { buildDependancyWheelOptions } = require('./dataBuild.js');
console.log("in");
const csvFileName = 'reader.csv';
// Read the JSON data from the CSV file
const json = getJsonFromFile(csvFileName);

// Build Highcharts options using the JSON data
const options = buildDependancyWheelOptions(json);

// Log the generated options
console.log("this is the end");
console.log(options);

