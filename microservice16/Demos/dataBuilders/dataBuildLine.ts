const valid_3: string[] = ["title", "Subtitle", "Xaxis", "Yaxis"];
const axisvalid: string[] = [];

function csvJSON(csv: string): any {
    let json: any = {};
    const lines: string[] = csv.split("\n");
    let series: any[] = [];
    let index: number = 0;
    const size: number = lines.length;
    let valid: boolean = true;

    while (index < size) {
        const field: string = lines[index].split("/r")[0].split(",")[0];
        let data: any = "";
        field.split(/\s/).join("")


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
            data.json.forEach(([key, value]: [string, string]) => {
                //titleschema?
                json[field].title[key] = value;
                
                if (key === "format") {
                    json[field].format = value;
                }
            });
        } else {
            valid = false;
            break;
        }
    }

    json.series = series;
    return json;
}

function splitr(line: string): { split?: string; valid: boolean } {
    let split = line.split("\r")[0];
    if (split) {
        return { split, valid: true };
    }
    return { valid: false };
}

function readFields(line: string, data: string): { json: any; fields: string[] } {
    let fields: string[] = line.split("\r")[0].split(",");
    let dataL: string[] = data.split("\r")[0].split(",");
    let json: any = {};

    const size: number = fields.length;
    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }
    return { json, fields };
}

function readSeries(lines: string[], index: number): { json: any; index: number } {
    let fields: string[] = lines[index].split("\r")[0].split(",");
    let data0: string[] = lines[++index].split("\r")[0].split(",");

    const size: number = lines.length;
    let posType: number = fields.indexOf("type");
    let pos: number = fields.indexOf("data");
    let posx: number = fields.indexOf("datax");
    let posy: number = fields.indexOf("datay");
    let json: any = {};
    let dataArray: any[] = [];
    let dataArrayy: any[] = [];
    let two: boolean = false;

    if (posType !== -1) {
        if (data0[posType] === "XY") two = true;
    }

    for (let i = 0; i < fields.length; i++) {
        if (!two) {
            if (i === pos) {
                dataArray = [data0[i]];
            }
        } else {
            if (i === posx) {
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
            //changed from data to data0
            data0 = data.split.split(",");

            if (data0[pos] === "END") {
                break;
            }
            dataArray.push(data0[pos]);
        } else {
            ++index;
            let data = splitr(lines[index]);

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

function buildLineOptions(data: any): any {
    data.series = buildSeries(data.series);
    let series: any[] = [];

    data.series.forEach((s: any) => {
        series.push({
            type: "line",
            data: s.data,
            name: s.name,
        });
    });

    let options: any = {
        title: data.title,
        series: series,
    };

    if (data.Subtitle) {
        options.subtitle = data.Subtitle;
    }
    if (data.Xaxis) {
        options.xAxis = {};
        let title: { text?: string } = {};  
        if (data.Xaxis.text) {
            title.text = data.Xaxis.text;
            options.xAxis.title = title;
        }
        if (data.Xaxis.format) {
            options.xAxis.format = `'value:${data.Xaxis.format}'`;
        }
    }
    if (data.Yaxis) {
        let title: { text?: string } = {};  
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

function buildSeries(series: any): any {
    let return_seires: any[] = [];
    series.forEach((s: any) => {
        if (s.type == "XY") {
            let xarray: any[] = [];
            let yarray: any[] = [];
            s.data = [];

            s.datax.forEach((x: any) => {
                xarray.push(parseFloat(x));
            });

            s.datay.forEach((y: any) => {
                yarray.push(parseFloat(y));
            });

            let data: any[] = [];
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
            let datax: any[] = [];

            s.datax.forEach((d: any) => {
                datax.push(parseFloat(d));
            });

            let data: any[] = [];
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
            let datay: any[] = [];

            s.datay.forEach((d: any) => {
                datay.push(parseFloat(d));
            });

            let data: any[] = [];
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
            let data: any[] = [];
            for (let i = 0; i < s.datay.length; i++) {
                data.push([s.datax[i]], s.datay[i]);
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

export { csvJSON, buildLineOptions };
