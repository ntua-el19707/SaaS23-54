const valid_3 = ["title", "Subtitle", "Xaxis", "Yaxis"]; //?for start i am gon eimpemnte for straight line if it works for all i make  it module acessible to all services
const axisvalid = [];
function csvJSON(csv) {
    let json = {}; //create an mpty json to store  return
    const lines = csv.split("\n");
    let series = [];
    let index = 0;
    const size = lines.length;
    let valid = true;
    while (index < size) {
        const field = lines[index].split("/r")[0].split(",")[0];
        let data = "";
        field.replaceAll(/\s/g, "");
        if (valid_3.includes(field)) {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            json[field] = data.json;
        } else if (field === "series") {
            let out = readSeries(lines, index + 1);
            series.push(out.json);

            index = out.index;
            ++index;
        } else if (axisvalid.includes(field)) {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            // console.log(data);
            data.json.forEach(([key, value]) => {
                if (titleSchema.includes(key)) {
                    json[field].title[key] = value;
                }
                if (key === "format") {
                    json[field].format = value;
                }
            });
        } else {
            //wrong input

            valid = false;
            break;
        }
    }
    json.series = series;
    return json;
}
function splitr(line) {
    let split = line.split("\r")[0];
    if (split) {
        return { split, valid: true };
    }
    return { valid: false };
}
function readFields(line, data) {
    let fields = line.split("\r")[0].split(",");
    let dataL = data.split("\r")[0].split(",");
    let json = {};

    const size = fields.length;
    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }
    return { json, fields };
}

function readSeries(lines, index) {
    let fields = lines[index].split("\r")[0].split(",");
    let data0 = lines[++index].split("\r")[0].split(",");

    const size = lines.length;
    let posType = fields.indexOf("type");
    let pos = fields.indexOf("data");
    let posx = fields.indexOf("datax");
    let posy = fields.indexOf("datay");
    let json = {};
    let dataArray = [];
    let dataArrayy = [];
    let two = false;
    if (posType !== -1) {
        if (data0[posType] === "XY") two = true;
        //console.log(fields);
    }
    for (let i = 0; i < fields.length; i++) {
        if (!two) {
            if (i === pos) {
                dataArray = [data0[i]];
            }
        } else {
            if (i === posx) {
                // console.log(i);
                dataArray = [data0[i]];
            }
            if (i === posy) {
                dataArrayy = [data0[i]];
            }
        }
        if (fields[i] !== "") json[fields[i]] = data0[i];
    }

    while (index < size) {
        if (!two) {
            ++index;

            let data = splitr(lines[index]);
            if (!data.valid) {
                break;
            }
            data = data.split.split(",");

            if (data[pos] === "END") {
                break;
            }
            dataArray.push(data[pos]);
        } else {
            ++index;

            let data = splitr(lines[index]);
            if (!data.valid) {
                break;
            }
            data = data.split.split(",");
            if (valid_3.includes(data[0])) {
                throw "not valid input";
            }
            if (data[posx] === "END" && data[posy] === "END") {
                break;
            } else if (data[posx] === "END" && data[posy] !== "END") {
                throw "not valid input";
            } else if (data[posx] !== "END" && data[posy] === "END") {
                throw "not valid input";
            }
            dataArray.push(data[posx]);
            dataArrayy.push(data[posy]);
        }
    }
    if (two) {
        json.datax = dataArray;
        json.datay = dataArrayy;
    } else {
        json.data = dataArray;
    }
    return { json, index };
}

function buildLineOptions(data) {
    data.series = buildSeries(data.series);
    // console.log(JSON.stringify(data.data));
    let series = [];

    data.series.forEach((s) => {
        series.push({
            type: "line",
            data: s.data,
            name: s.name,
        });
    });
    let options = {
        title: data.title,

        series: series,
    };
    if (data.Subtitle) {
        options.subtitle = data.Subtitle;
    }
    if (data.Xaxis) {
        options.xAxis = {};

        let title = {};
        if (data.Xaxis.text) {
            title.text = data.Xaxis.text;
            options.xAxis.title = title;
        }

        if (data.Xaxis.format) {
            options.xAxis.format = `'value:${data.Xaxis.format}'`;
        }
    }
    if (data.Yaxis) {
        let title = {};
        options.yAxis = {};
        if (data.Yaxis.text) {
            title.text = data.Yaxis.text;
            options.yAxis.title = title;
        }

        if (data.Yaxis.format) {
            options.yAxis.format = `'value:${data.Yaxis.format}'`;
        }
    }
    return options;
}

function buildSeries(series) {
    let return_seires = [];
    series.forEach((s) => {
        if (s.type == "XY") {
            let xarray = [];
            let yarray = [];
            s.data = [];
            s.datax.forEach((x) => {
                xarray.push(parseFloat(x));
            });
            s.datay.forEach((y) => {
                yarray.push(parseFloat(y));
            });
            let data = [];
            for (let i = 0; i < xarray.length; i++) {
                data.push([xarray[i], yarray[i]]);
            }
            return_seires = [
                ...return_seires,
                {
                    name: s.name,
                    data: data,
                },
            ];
        } else if (s.type == "X") {
            let datax = [];

            s.datax.forEach((d) => {
                datax.push(parseFloat(d));
            });
            let data = [];
            for (let i = 0; i < data.length; i++) {
                data.push([datax[i], s.datay[i]]);
            }
            return_seires = [
                ...return_seires,
                {
                    name: s.name,
                    data: data,
                },
            ];
        } else if (s.type == "Y") {
            let datay = [];

            s.datay.forEach((d) => {
                datay.push(parseFloat(d));
            });

            let data = [];
            for (let i = 0; i < datay.length; i++) {
                data.push([s.datax[i], datay[i]]);
            }
            return_seires = [
                ...return_seires,
                {
                    name: s.name,
                    data: data,
                },
            ];
        } else {
            let data = [];
            for (let i = 0; i < s.datay.length; i++) {
                data.push([s.datax[i]], s.datay[y]);
            }
            return_seires = [
                ...return_seires,
                {
                    name: s.name,
                    data: data,
                },
            ];
        }
    });
    return return_seires;
}

module.exports = { csvJSON, buildLineOptions };