"use strict";
//import { readFileSync, unlinkSync } from "fs";
//import * as pathM from "path";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLinewithAnnotationsOptions = exports.csvJSON = void 0;
function spliter(lines, index) {
    var fields = lines[index].split("\r")[0].split(",");
    fields = fields.filter(function (e) {
        return e.split(/(\r\n|\n|\r)/gm).join("");
    });
    var rsp = [];
    fields.forEach(function (e) {
        rsp.push(e.split(/\s/).join(""));
    });
    return rsp;
}
function csvJSON(csv) {
    var valid = ["annotations", "title"];
    var json = {
        series: [],
        xAxis: {
            labels: {
                format: "",
            },
            minRange: 0,
            title: {
                text: "",
            },
            accessibility: {
                rangeDescription: "",
            },
        },
        yAxis: {
            startOnTick: true,
            endOnTick: false,
            maxPadding: 0.35,
            labels: {
                format: "",
            },
            minRange: 0,
            title: {
                text: "",
            },
            accessibility: {
                rangeDescription: "",
            },
        },
        annotations: {
            labels: [],
        },
    };
    var lines = csv.split("\n");
    var index = 0;
    var size = lines.length;
    console.log(size);
    while (index < size) {
        var field = spliter(lines, index)[0];
        if (field === "series") {
            var data_1 = readSeries(lines, index + 1);
            json.series.push({
                data: data_1.rsp,
                name: data_1.name,
                fillOpacity: 0.5,
                marker: {
                    enabled: false
                },
                threshold: null
            });
            index = data_1.index;
        }
        else if (field === "annotations") {
            var data_2 = readAnnotations(lines, index + 1);
            json.annotations.labels = data_2.rsp;
            index = data_2.index;
        }
        else if (valid.includes(field)) {
            var data_3 = readFields(lines, index + 1);
            json[field] = data_3.json;
            index += 2;
        }
        else if (field === "xAxis") {
            console.log(lines[index + 1]);
            var data_4 = readxAxis(lines, index + 1);
            index = data_4.index;
            json.xAxis = data_4.json;
        }
        else if (field === "yAxis") {
            console.log(lines[index + 1]);
            var data_5 = readyAxis(lines, index + 1);
            json.yAxis = data_5.json;
            index = data_5.index;
        }
        ++index;
    }
    return json;
}
exports.csvJSON = csvJSON;
function readSeries(lines, index) {
    try {
        var size = lines.length;
        var data_6 = spliter(lines, index);
        var name_1 = data_6[0];
        //skip elevation_line
        ++index;
        var elevation_data = [];
        while (index < size) {
            var data_7 = spliter(lines, index);
            if (data_7[0] === "series") {
                index--;
                break;
            }
            data_7[0] = parseFloat(data_7[0]);
            data_7[1] = parseFloat(data_7[1]);
            elevation_data.push(data_7);
            ++index;
        }
        var rsp = elevation_data;
        return { rsp: rsp, index: index, name: name_1 };
    }
    catch (err) {
        throw err;
    }
}
function readFields(lines, index) {
    index++;
    var data = spliter(lines, index);
    var title_text = data[0];
    var title_alignment = data[1];
    var json = {
        text: title_text,
        align: title_alignment
    };
    return json;
}
function readAnnotations(lines, index) {
    var size = lines.length;
    ++index;
    var labels = [];
    var data = spliter(lines, index);
    var xAxis = data[0];
    var yAxis = data[1];
    while (data[0] != "series") {
        var label = {
            point: {
                xAxis: parseInt(xAxis),
                yAxis: parseInt(yAxis),
                x: parseInt(data[2]),
                y: parseInt(data[3]),
            },
            text: data[4],
        };
        labels.push(label);
        console.log("try here:" + label.point.y);
        index++;
        data = spliter(lines, index);
    }
    index--;
    var rsp = labels;
    return { rsp: rsp, index: index };
}
function readxAxis(lines, index) {
    try {
        var size = lines.length;
        ++index;
        var xAxis_format = spliter(lines, index);
        ++index;
        ++index;
        var xAxis_title = spliter(lines, index);
        if (xAxis_title[0] === "null")
            xAxis_title[0] = null;
        ++index;
        ++index;
        var xAxis_range = spliter(lines, index);
        var json = {
            labels: {
                format: "{value} " + xAxis_format[0],
            },
            minRange: 5,
            title: {
                text: xAxis_title[0],
            },
            accessibility: {
                rangeDescription: "Range: " +
                    xAxis_range[0] +
                    " to " +
                    xAxis_range[1] +
                    xAxis_format[0],
            },
        };
        return { json: json, index: index };
    }
    catch (err) {
        throw err;
    }
}
function readyAxis(lines, index) {
    try {
        var size = lines.length;
        ++index;
        var yAxis_format = spliter(lines, index);
        ++index;
        ++index;
        var yAxis_title = spliter(lines, index);
        if (yAxis_title[0] === "null")
            yAxis_title[0] = null;
        ++index;
        ++index;
        var yAxis_range = spliter(lines, index);
        var json = {
            startOnTick: true,
            endOnTick: false,
            maxPadding: 0.35,
            title: {
                text: yAxis_title[0],
            },
            labels: {
                format: "{value} " + yAxis_format[0],
            },
            minRange: 5,
            accessibility: {
                rangeDescription: "Range: " +
                    yAxis_range[0] +
                    " to " +
                    yAxis_range[1] +
                    yAxis_format[0],
            },
        };
        return { json: json, index: index };
    }
    catch (err) {
        throw err;
    }
}
function buildLinewithAnnotationsOptions(data) {
    var options = {
        chart: {
            type: "area",
            zoomType: "x",
            panning: true,
            panKey: "shift",
            scrollablePlotArea: {
                minWidth: 600,
            },
        },
    };
    options.series = data.series;
    options.annotations = {
        draggable: "",
        labelOptions: {
            backgroundColor: "rgba(255,255,255,0.5)",
            verticalAlign: "top",
            y: 15,
        },
        labels: data.annotations.labels,
    };
    options.title = data.title;
    options.xAxis = data.xAxis;
    options.yAxis = data.yAxis;
    options.legend = {
        enabled: false,
    };
    return options;
}
exports.buildLinewithAnnotationsOptions = buildLinewithAnnotationsOptions;
