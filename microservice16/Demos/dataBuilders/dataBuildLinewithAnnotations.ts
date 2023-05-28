//import { readFileSync, unlinkSync } from "fs";
//import * as pathM from "path";

interface SeriesData {
    data: number[][];
    fillOpacity?: number;
    name: string;
    marker?: {
        enabled?: boolean;
    };
    threshold?: null;
}
interface JSONData {
    series: SeriesData[];
    xAxis: {
        labels: {
            format: string;
        };
        minRange: number;
        title: {
            text: string;
        };
        accessibility: {
            rangeDescription: string;
        };
    };
    yAxis: {
        startOnTick: boolean;
        endOnTick: boolean;
        maxPadding?: number;
        labels: {
            format: string;
        };
        minRange: number;
        title: {
            text: string;
        };
        accessibility: {
            rangeDescription: string;
        };
    };
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
        rsp.push(e.split(/\s/).join(""));
    });

    return rsp;
}

function csvJSON(csv: string): JSONData {
    const valid = ["annotations", "title"];
    let json: JSONData = {
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

    let lines = csv.split("\n");
    let index = 0;
    let size = lines.length;
    console.log(size);
    while (index < size) {
        let field = spliter(lines, index)[0];
        if (field === "series") {
            let data = readSeries(lines, index + 1);
            json.series.push(
                {
                    data: data.rsp,
                    name: data.name,
                    fillOpacity: 0.5,
                    marker: {
                        enabled: false
                    },
                    threshold: null
                });
            index = data.index;
        } else if (field === "annotations") {
            const data = readAnnotations(lines, index + 1);
            json.annotations.labels = data.rsp;
            index = data.index;
        } else if (valid.includes(field)) {
            const data = readFields(lines, index + 1);
            json[field] = data.json;
            index += 2;
        } else if (field === "xAxis") {
            console.log(lines[index + 1]);
            const data = readxAxis(lines, index + 1);
            index = data.index;
            json.xAxis = data.json;
        } else if (field === "yAxis") {
            console.log(lines[index + 1]);
            const data = readyAxis(lines, index + 1);
            json.yAxis = data.json;
            index = data.index;
        }
        ++index;
    }

    return json;
}

function readSeries(lines: string[], index: number) {
    try {
        const size = lines.length;
        let data = spliter(lines, index);
        let name: string = data[0];
        //skip elevation_line
        ++index;

        let elevation_data: number[][] = [];

        while (index < size) {
            let data: any = spliter(lines, index);

            if (data[0] === "series") {
                index--;
                break;
            }

            data[0] = parseFloat(data[0]);
            data[1] = parseFloat(data[1]);

            elevation_data.push(data);
            ++index;
        }

        let rsp: number[][] = elevation_data;

        return { rsp, index, name };
    } catch (err) {
        throw err;
    }
}

function readFields(lines: string[], index: number) {
    index++
    let data = spliter(lines, index);
    let title_text: string = data[0];
    let title_alignment: string = data[1];

    let json: any = {
        text: title_text,
        align: title_alignment
    }
    return json;
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

function readxAxis(lines: string[], index: number): { json: JSONData['xAxis'], index: number } {
    try {
        const size = lines.length;
        ++index;
        let xAxis_format = spliter(lines, index);
        ++index;
        ++index;
        let xAxis_title = spliter(lines, index);
        if (xAxis_title[0] === "null") xAxis_title[0] = null;
        ++index;
        ++index;
        let xAxis_range = spliter(lines, index);
        let json: JSONData['xAxis'] = {
            labels: {
                format: "{value} " + xAxis_format[0],
            },
            minRange: 5,
            title: {
                text: xAxis_title[0],
            },
            accessibility: {
                rangeDescription:
                    "Range: " +
                    xAxis_range[0] +
                    " to " +
                    xAxis_range[1] +
                    xAxis_format[0],
            },
        };

        return { json, index };
    } catch (err) {
        throw err;
    }
}


function readyAxis(lines: string[], index: number): { json: JSONData['yAxis'], index: number } {
    try {
        const size = lines.length;
        ++index;
        let yAxis_format = spliter(lines, index);
        ++index;
        ++index;
        let yAxis_title = spliter(lines, index);
        if (yAxis_title[0] === "null") yAxis_title[0] = null;
        ++index;
        ++index;
        let yAxis_range = spliter(lines, index);
        let json: JSONData['yAxis'] = {
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
                rangeDescription:
                    "Range: " +
                    yAxis_range[0] +
                    " to " +
                    yAxis_range[1] +
                    yAxis_format[0],
            },
        };

        return { json, index };
    } catch (err) {
        throw err;
    }
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


export { csvJSON, buildLinewithAnnotationsOptions };