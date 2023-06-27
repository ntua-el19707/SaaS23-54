//const csv = require("csv-parser");


function getJsonFromCSVString(csvString) {
    const lines = csvString.split("\n");
    const jsonObject = {
        title: { text: "", align: "" },
        subtitle: { text: "", align: "" },
        xAxis: { categories: [] },
        yAxis: { title: { text: "" } },
        series: [],
    };

    let currentSeries = null;
    let yValues = [];

    lines.forEach((line) => {
        const row = line.split(",");
        const key = row[0];
        const text = row[1];
        const align = row[2];

        if (key === "title") {
            jsonObject.title = { text, align };
        } else if (key === "subtitle") {
            jsonObject.subtitle = { text, align };
        } else if (key === "xAxis") {
            jsonObject.xAxis = {
                categories: convertTextToArray(line),   
            };
        } else if (key === "yAxis") {
            jsonObject.yAxis = {
                title: { text },
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
        } else if (currentSeries && row[1] !== undefined) {
            yValues.push(Number(row[1]));
        }
    });

    if (currentSeries) {
        jsonObject.series.push({
            name: currentSeries,
            data: yValues.slice(1), // Exclude the first null value
        });
    }
    return jsonObject;

    //   return JSON.stringify(jsonObject, null, 2);
}


function convertTextToArray(row) {
    // Remove leading and trailing brackets, if present
    const values = row.split(",");
    const length = values.length;
    values[1] = values[1].replace(/"/g, "").replace("[", "");
    values[length - 2] = values[length - 2].replace("]", "").replace(/"/g, "");


    const array = values.slice(1, -1).map((element) => [element]);
    return array;
}


function buildColumnOptions(data) {
    data.chart = {
        type: "column",
    };

    return data;
}

module.exports = { getJsonFromCSVString, buildColumnOptions };
/*
const csvString = `title,rainfall,center
subtitle,subtitle,left
xAxis,"[1,2,3,4,5,6,7,8,9,10]",
yAxis,y axis txt,
series,,
name,jikkos,
,1000,
,1234,
,4000,
,4500,
,5000,
,2379,
,1234,
,1234,
,1234,
,1234,
name,anagia,
,1234,
,1234,
,1234,
,1234,
,2345,
,1234,
,1234,
,1234,
,1234,
,1234,
name,akaji,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,4221,
name,zakaji,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,1234,
,6382,
,1234,
,1234,`;

const jsonObject = getJsonFromCSVString(csvString);
console.log(jsonObject);
*/