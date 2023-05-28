function csvJSON(csv: string): any {
    const valid = ["plotOptions", "title", "Subtitle"];
    let json: any = {
        series: [],
    };

    let lines = csv.split("\n");
    let index = 0;
    let size = lines.length;

    while (index < size) {
        let field = spliter(lines, index)[0];

        if (field === "series") {
            let data = readSeries(lines, index + 1);
            json.series.push(data.rsp);
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

function readSeries(lines: string[], index: number) {
    const size = lines.length;
    const fields = spliter(lines, index);
    const validFields = ["type", "name", "data"];

    fields.forEach((f) => {
        if (!validFields.includes(f)) {
            throw new Error("invalid input");
        }
    });

    if (fields.length !== 3) {
        throw new Error("invalid input");
    }

    ++index;
    const dataP = fields.indexOf("data");
    const nameP = fields.indexOf("name");
    const typeP = fields.indexOf("type");

    let data = spliter(lines, index);

    let rsp = {
        name: data[nameP],
        type: data[typeP],
        data: [],
    };

    while (index < size) {
        if (data[0] === "end") {
            break;
        }

        rsp.data.push(data[dataP]);
        ++index;
        data = spliter(lines, index);
    }

    return { rsp, index };
}

function readFields(lines: string[], index: number) {
    let fields = spliter(lines, index);
    let dataL = spliter(lines, index + 1);
    let json: any = {};

    const size = fields.length;

    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") {
            json[fields[i]] = dataL[i];
        }
    }

    return { json, fields };
}

function buildPolarOptions(data: any) {
    let options: any = {
        chart: {
            polar: true,
        },
    };

    data.plotOptions = buildPlot(data.plotOptions);
    data.series = buildSeries(data.series);

    if (data.title) {
        options.title = {};
        if (data.title.text) {
            options.title.text = data.title.text;
        }
        if (data.title.align) {
            options.title.align = data.title.align;
        }
    }

    if (data.Subtitle) {
        options.subtitle = {};
        if (data.Subtitle.text) {
            options.subtitle.text = data.Subtitle.text;
        }
        if (data.Subtitle.align) {
            options.subtitle.align = data.Subtitle.align;
        }
    }

    options.pane = {
        startAngle: 0,
        endAngle: 360,
    };

    options.xAxis = {
        tickInterval: data.plotOptions.iterval / 2,
        min: 0,
        max: 360,
        labels: {
            format: "{value}°",
        },
    };

    options.plotOptions = {
        series: {
            pointStart: data.plotOptions.start,
            pointInterval: data.plotOptions.iterval,
        },
        column: {
            pointPadding: 0,
            groupPadding: 0,
        },
    };

    options.series = data.series;

    return options;
}

function buildPlot(options: any) {
    options.start = parseFloat(options.start);
    options.iterval = parseFloat(options.iterval);
    return options;
}

function buildSeries(series: any[]) {
    series.forEach((s) => {
        let array: number[] = [];
        s.data.forEach((d: any) => {
            array.push(parseFloat(d));
        });
        s.data = array;
    });

    return series;
}


export { csvJSON, buildPolarOptions };