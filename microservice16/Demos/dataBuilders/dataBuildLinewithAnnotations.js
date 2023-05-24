//const { readFileSync, unlinkSync } = require("fs");
//const pathM = require("path");

function spliter(lines, index) {
    let fields = lines[index].split("\r")[0].split(",");
    fields = fields.filter(function (e) {
        return e.replaceAll(/(\r\n|\n|\r)/gm, "");
    });
    let rsp = [];
    fields.forEach((e) => {
        rsp.push(e.replaceAll(/\s/g, ""));
    });

    return rsp;
}
function csvJSON(csv) {
    const valid = ["annotations", "title"];
    let json = {};
    let lines = csv.split("\n");
    //console.log(lines)
    let index = 0;
    let size = lines.length;
    json.series = [];

    json.annotations = {}
    json.annotations.labels = [];

    while (index < size) {
        let field = spliter(lines, index)[0];
        if (field === "series") {
            let data = readSeries(lines, index + 1);
            //console.log(data.rsp);
            json.series.data = data.rsp;
            index = data.index;
        } else if (field === "annotations") {
            const data = readAnnotations(lines, index + 1);
            json.annotations.labels = (data.rsp);
            index = data.index;
        } else if (valid.includes(field)) {
            const data = readFields(lines, index + 1);
            json[field] = data.json;
            index += 2;
        }
        ++index;
    }
    console.log(JSON.stringify(json.series[0]))
    return json;
}


function readSeries(lines, index) {
    const size = lines.length;
    ++index;

    let elevation_data = [];

    while (index < size) {

        data = spliter(lines, index);

        if (data[0] === "end") {
            break;
        }

        //if (data.length != 5)
        //    throw new Error("invalid input");

        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);

        elevation_data.push(data);
        ++index;
    }

    let rsp = {
        data: elevation_data
    }

    return { rsp, index };
}

function readFields(lines, index) {
    let fields = spliter(lines, index);
    let dataL = spliter(lines, index + 1);
    let json = {};

    const size = fields.length;
    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }
    return { json, fields };
}

function readAnnotations(lines, index) {
    const size = lines.length;
    ++index;

    let labels = [];

    let data = spliter(lines, index);
    xAxis = data[0];
    yAxis = data[1];

    while (data[0] != "series") {
        //check if valid?
        let label = {
            point: {
                xAxis: xAxis,
                yAxis: yAxis,
                x: data[2],
                y: data[3]
            },
            text: data[4]
        };
        labels.push(label);
        //console.log("try here:" + label.point.y)

        index++;
        data = spliter(lines, index);
    }
    index--;

    rsp = labels;
    /*
        let rsp = {
            annotations: labels
        }
    */
    return { rsp, index };
}

function buildLinewithAnnotationsOptions(data) {
    data = data;

    let options = {
        chart: {
            type: 'area',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            scrollablePlotArea: {
                minWidth: 600
            }
        },
    };

    options.series = {
        data: data.series.data,
        //lineColor: Highcharts.getOptions().colors[1],
        //color: Highcharts.getOptions().colors[2],
        fillOpacity: 0.5,
        name: 'Elevation',
        marker: {
            enabled: false
        },
        threshold: null
    };

    options.annotations = {
        draggable: '',
        labelOptions: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            verticalAlign: 'top',
            y: 15
        },
        labels: data.annotations.labels
    };

    if (data.title) {
        options.title = {};
        if (data.title.text) {
            options.title.text = data.title.text;
        }
        if (data.title.align) {
            options.title.align = data.title.align;
        }
    };

    options.xAxis = {
        labels: {
            format: '{value} km'
        },
        minRange: 5,
        title: {
            text: 'Distance'
        }
    };

    options.yAxis = {
        startOnTick: true,
        endOnTick: false,
        maxPadding: 0.35,
        title: {
            text: null
        },
        labels: {
            format: '{value} m'
        }
    };

    options.legend = {
        enabled: false
    };

    return options;
}




module.exports = { csvJSON, buildLinewithAnnotationsOptions };
