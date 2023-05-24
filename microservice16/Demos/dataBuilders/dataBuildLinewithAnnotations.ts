//import { readFileSync, unlinkSync } from "fs";
//import * as pathM from "path";

interface JSONData {
    series: {
        //data may not be neceessary
        data: number[][];
    }[];
    annotations: {
        labels: {
            point: {
                xAxis: number;
                yAxis: number;
                x: number;
                y: number;
            };
            text: string;
        }[];
    };
    title?: {
        text?: string;
        align?: string;
    };
}


function spliter(lines: string[], index: number): string[] {
    let fields = lines[index].split("\r")[0].split(",");
    fields = fields.filter(function (e) {
        return e.split(/(\r\n|\n|\r)/gm).join("");
    });
    let rsp: string[] = [];
    fields.forEach((e) => {
        rsp.push(e.split(/\s/).join(""));    });

    return rsp;
}

function csvJSON(csv: string): JSONData {
    const valid = ["annotations", "title"];
    let json: JSONData = {
        series: [],
        annotations: { labels: [] },
    };
    let lines = csv.split("\n");
    let index = 0;
    let size = lines.length;
    console.log(size);
    while (index < size) {
        let field = spliter(lines, index)[0];
        if (field === "series") {
            let data = readSeries(lines, index + 1);
            json.series.push({ data: data.rsp });
            index = data.index;
        } else if (field === "annotations") {
            const data = readAnnotations(lines, index + 1);
            json.annotations.labels = data.rsp;
            index = data.index;
        } else if (valid.includes(field)) {
            const data = readFields(lines, index + 1);
            json[field] = data.json;
            index += 2;
        }
        ++index;
    }

    return json;
}

function readSeries(lines: string[], index: number) {
    const size = lines.length;
    ++index;

    let elevation_data: number[][] = [];

    while (index < size) {
        let data: any = spliter(lines, index);

        if (data[0] === "end") {
            break;
        }

        data[0] = parseFloat(data[0]);
        data[1] = parseFloat(data[1]);

        elevation_data.push(data);
        ++index;
    }

    let rsp: number[][] = elevation_data;

    return { rsp, index };
}

function readFields(lines: string[], index: number) {
    let fields = spliter(lines, index);
    let dataL = spliter(lines, index + 1);
    let json: { [key: string]: string } = {};

    const size = fields.length;
    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }
    return { json, fields };
}

function readAnnotations(lines: string[], index: number) {
    const size = lines.length;
    ++index;

    let labels: {
        point: {
            xAxis: number;
            yAxis: number;
            x: number;
            y: number;
        };
        text: string;
    }[] = [];

    let data = spliter(lines, index);
    let xAxis = data[0];
    let yAxis = data[1];

    while (data[0] != "series") {
        let label = {
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

    let rsp = labels;

    return { rsp, index };
}

function buildLinewithAnnotationsOptions(data: JSONData) {
    let options: any = {
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

    options.series = [
        {
            data: data.series[0].data,
            fillOpacity: 0.5,
            name: "Elevation",
            marker: {
                enabled: false,
            },
            threshold: null,
        },
    ];

    options.annotations = {
        draggable: "",
        labelOptions: {
            backgroundColor: "rgba(255,255,255,0.5)",
            verticalAlign: "top",
            y: 15,
        },
        labels: data.annotations.labels,
    };

    if (data.title) {
        options.title = {};
        if (data.title.text) {
            options.title.text = data.title.text;
        }
        if (data.title.align) {
            options.title.align = data.title.align;
        }
    }

    options.xAxis = {
        labels: {
            format: "{value} km",
        },
        minRange: 5,
        title: {
            text: "Distance",
        },
    };

    options.yAxis = {
        startOnTick: true,
        endOnTick: false,
        maxPadding: 0.35,
        title: {
            text: null,
        },
        labels: {
            format: "{value} m",
        },
    };

    options.legend = {
        enabled: false,
    };

    return options;
}


export { csvJSON, buildLinewithAnnotationsOptions };