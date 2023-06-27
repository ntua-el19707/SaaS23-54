"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLineOptions = exports.csvJSON = void 0;
var valid_3 = ["title", "Subtitle", "Xaxis", "Yaxis"];
var axisvalid = [];
function csvJSON(csv) {
    var json = {};
    var lines = csv.split("\n");
    var series = [];
    var index = 0;
    var size = lines.length;
    var valid = true;
    var _loop_1 = function () {
        var field = lines[index].split("/r")[0].split(",")[0];
        var data = "";
        field.split(/\s/).join("");
        if (valid_3.includes(field)) {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            json[field] = data.json;
        }
        else if (field === "series") {
            var out = readSeries(lines, index + 1);
            series.push(out.json);
            index = out.index;
            ++index;
        }
        else if (axisvalid.includes(field)) {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            data.json.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                //titleschema?
                json[field].title[key] = value;
                if (key === "format") {
                    json[field].format = value;
                }
            });
        }
        else {
            valid = false;
            return "break";
        }
    };
    while (index < size) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    json.series = series;
    return json;
}
exports.csvJSON = csvJSON;
function splitr(line) {
    var split = line.split("\r")[0];
    if (split) {
        return { split: split, valid: true };
    }
    return { valid: false };
}
function readFields(line, data) {
    var fields = line.split("\r")[0].split(",");
    var dataL = data.split("\r")[0].split(",");
    var json = {};
    var size = fields.length;
    for (var i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }
    return { json: json, fields: fields };
}
function readSeries(lines, index) {
    var fields = lines[index].split("\r")[0].split(",");
    var data0 = lines[++index].split("\r")[0].split(",");
    var size = lines.length;
    var posType = fields.indexOf("type");
    var pos = fields.indexOf("data");
    var posx = fields.indexOf("datax");
    var posy = fields.indexOf("datay");
    var json = {};
    var dataArray = [];
    var dataArrayy = [];
    var two = false;
    if (posType !== -1) {
        if (data0[posType] === "XY")
            two = true;
    }
    for (var i = 0; i < fields.length; i++) {
        if (!two) {
            if (i === pos) {
                dataArray = [data0[i]];
            }
        }
        else {
            if (i === posx) {
                dataArray = [data0[i]];
            }
            if (i === posy) {
                dataArrayy = [data0[i]];
            }
        }
        if (fields[i] !== "")
            json[fields[i]] = data0[i];
    }
    while (index < size) {
        if (!two) {
            ++index;
            var data = splitr(lines[index]);
            if (!data.valid) {
                break;
            }
            //changed from data to data0
            data0 = data.split.split(",");
            if (data0[pos] === "END") {
                break;
            }
            dataArray.push(data0[pos]);
        }
        else {
            ++index;
            var data = splitr(lines[index]);
            if (!data.valid) {
                break;
            }
            //changed from data to data0
            data0 = data.split.split(",");
            if (valid_3.includes(data0[0])) {
                throw "not valid input";
            }
            if (data[posx] === "END" && data[posy] === "END") {
                break;
            }
            else if (data[posx] === "END" && data[posy] !== "END") {
                throw "not valid input";
            }
            else if (data[posx] !== "END" && data[posy] === "END") {
                throw "not valid input";
            }
            dataArray.push(data[posx]);
            dataArrayy.push(data[posy]);
        }
    }
    if (two) {
        json.datax = dataArray;
        json.datay = dataArrayy;
    }
    else {
        json.data = dataArray;
    }
    return { json: json, index: index };
}
function buildLineOptions(data) {
    data.series = buildSeries(data.series);
    var series = [];
    data.series.forEach(function (s) {
        series.push({
            type: "line",
            data: s.data,
            name: s.name,
        });
    });
    var options = {
        title: data.title,
        series: series,
    };
    if (data.Subtitle) {
        options.subtitle = data.Subtitle;
    }
    if (data.Xaxis) {
        options.xAxis = {};
        var title = {};
        if (data.Xaxis.text) {
            title.text = data.Xaxis.text;
            options.xAxis.title = title;
        }
        if (data.Xaxis.format) {
            options.xAxis.format = "'value:".concat(data.Xaxis.format, "'");
        }
    }
    if (data.Yaxis) {
        var title = {};
        options.yAxis = {};
        if (data.Yaxis.text) {
            title.text = data.Yaxis.text;
            options.yAxis.title = title;
        }
        if (data.Yaxis.format) {
            options.yAxis.format = "'value:".concat(data.Yaxis.format, "'");
        }
    }
    return options;
}
exports.buildLineOptions = buildLineOptions;
function buildSeries(series) {
    var return_seires = [];
    series.forEach(function (s) {
        if (s.type == "XY") {
            var xarray_1 = [];
            var yarray_1 = [];
            s.data = [];
            s.datax.forEach(function (x) {
                xarray_1.push(parseFloat(x));
            });
            s.datay.forEach(function (y) {
                yarray_1.push(parseFloat(y));
            });
            var data = [];
            for (var i = 0; i < xarray_1.length; i++) {
                data.push([xarray_1[i], yarray_1[i]]);
            }
            return_seires = __spreadArray(__spreadArray([], return_seires, true), [
                {
                    name: s.name,
                    data: data,
                },
            ], false);
        }
        else if (s.type == "X") {
            var datax_1 = [];
            s.datax.forEach(function (d) {
                datax_1.push(parseFloat(d));
            });
            var data = [];
            for (var i = 0; i < data.length; i++) {
                data.push([datax_1[i], s.datay[i]]);
            }
            return_seires = __spreadArray(__spreadArray([], return_seires, true), [
                {
                    name: s.name,
                    data: data,
                },
            ], false);
        }
        else if (s.type == "Y") {
            var datay_1 = [];
            s.datay.forEach(function (d) {
                datay_1.push(parseFloat(d));
            });
            var data = [];
            for (var i = 0; i < datay_1.length; i++) {
                data.push([s.datax[i], datay_1[i]]);
            }
            return_seires = __spreadArray(__spreadArray([], return_seires, true), [
                {
                    name: s.name,
                    data: data,
                },
            ], false);
        }
        else {
            var data = [];
            for (var i = 0; i < s.datay.length; i++) {
                data.push([s.datax[i]], s.datay[i]);
            }
            return_seires = __spreadArray(__spreadArray([], return_seires, true), [
                {
                    name: s.name,
                    data: data,
                },
            ], false);
        }
    });
    return return_seires;
}
