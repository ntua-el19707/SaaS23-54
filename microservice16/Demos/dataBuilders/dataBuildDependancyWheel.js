"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDependancyWheelOptions = exports.csvJSON = void 0;
function csvJSON(csv) {
    console.log("in");
    var json = {};
    var lines = csv.split("\n");
    json.series = [];
    var index = 0;
    var size = lines.length;
    while (index < size) {
        var field = lines[index].split("/r")[0].split(",")[0];
        var data = void 0;
        if (field === "title") {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            json[field] = data.json;
        }
        else if (field === "series") {
            var out = readSeries(lines, index + 1);
            json.series = out;
            break;
        }
        else {
            //wrong input
            break;
        }
    }
    //json.series = series;
    console.log(json.series.keys);
    console.log(json.series);

    return json;
}
exports.csvJSON = csvJSON;
function readFields(line, data) {
    var fields = line.split("\r")[0].split(",");
    var dataL = data.split("\r")[0].split(",");
    var json = {};
    var size = fields.length;
    for (var i = 0; i < size; i++) {
        if (fields[i] !== "")
            json[fields[i]] = dataL[i];
    }
    return { json: json, fields: fields };
}
function readSeries(lines, index) {
    //skip name line
    index++;
    var name = lines[index++].split("\r")[0].split(",");
    //skip key line
    index++;
    var fields = lines[index++].split("\r")[0].split(",");
    //skip data line
    index++;
    var size = lines.length;
    var json = {};
    var dataArray = [];
    while (index < size) {
        //let data0 = lines[index++].split("\r")[0].split(",");
        var data0 = lines[index++].split("\r")[0].split(",");
        if (data0[0] === "") {
            break;
        }
        data0[2] = parseFloat(data0[2]);
        dataArray.push(data0);
        index++;
    }
    //console.log(dataArray)
    var series = {
        name: name,
        keys: fields,
        data: dataArray,
    };
    return series;
}
function buildDependancyWheelOptions(data) {
    var options = {};
    if (data.title) {
        options.title = {};
        if (data.title.text) {
            options.title.text = data.title.text;
        }
    }
    options.accessibility = {
        point: {
            valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.',
        },
    };
    options.series = [
        {
            keys: data.series.keys,
            data: data.series.data,
            name: data.series.name,
            type: 'dependencywheel',
            dataLabels: {
                color: '#333',
                style: {
                    textOutline: 'none',
                },
                textPath: {
                    enabled: true,
                },
                distance: 10,
            },
            size: '95%',
        },
    ];
    //TODO  implement options builder
    return options;
}
exports.buildDependancyWheelOptions = buildDependancyWheelOptions;
