function csvJSON(csv: string): any {
    let json: any = {};
    const lines = csv.split("\n");
    json.series = [];

    let index = 0;
    const size = lines.length;
    while (index < size) {
        const field = lines[index].split("/r")[0].split(",")[0];
        let data;
        if (field === "title") {
            data = readFields(lines[index + 1], lines[index + 2]);
            index += 3;
            json[field] = data.json;
        } else if (field === "series") {
            let out = readSeries(lines, index + 1);
            json.series = out;
            break;
        } else {
            //wrong input
            break;
        }
    }
    //json.series = series;
    console.log(json.series.keys);
    return json;
}

function readFields(line: string, data: string): { json: any; fields: string[] } {
    let fields = line.split("\r")[0].split(",");
    let dataL = data.split("\r")[0].split(",");
    let json: any = {};

    const size = fields.length;
    for (let i = 0; i < size; i++) {
        if (fields[i] !== "") json[fields[i]] = dataL[i];
    }
    return { json, fields };
}

function readSeries(lines: string[], index: number): { keys: string[]; data: any[] } {
    //skip name line
    index++;
    let name = lines[index++].split("\r")[0].split(",");
    //skip key line
    index++;
    let fields = lines[index++].split("\r")[0].split(",");
    //skip data line
    index++;
    const size = lines.length;
    let json: any = {};
    let dataArray: any[] = [];

    while (index < size) {
        //let data0 = lines[index++].split("\r")[0].split(",");
        let data0: any = lines[index++].split("\r")[0].split(",");        
        if (data0[0] === "") {
            break;
        }
        data0[2] = parseFloat(data0[2]);
        dataArray.push(data0);
        index++;
    }
    //console.log(dataArray)

    const series = {
        name: name,
        keys: fields,
        data: dataArray,
    };
    return series;
}

function buildDependancyWheelOptions(data: any): any {
    let options: any = {};

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

export { csvJSON, buildDependancyWheelOptions };
