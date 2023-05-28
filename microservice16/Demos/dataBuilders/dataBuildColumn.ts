function getJsonFromCSVString(csvString: string): string {
    const lines: string[] = csvString.split("\n");

    const jsonObject: any = {
        title: { text: "", align: "" },
        subtitle: { text: "", align: "" },
        xAxis: { categories: [] },
        yAxis: { title: { text: "" } },
        series: [],
    };

    let currentSeries: string | null = null;
    let yValues: number[] = [];

    lines.forEach((line) => {
        const row: string[] = line.split(",");

        const key: string = row[0];
        const text: string = row[1];
        const align: string = row[2];

        if (key === "title") {
            jsonObject.title = { text, align };
        } else if (key === "subtitle") {
            jsonObject.subtitle = { text, align };
        } else if (key === "xAxis") {
            jsonObject.xAxis = {
                categories: JSON.parse(text),
            };
        } else if (key === "yAxis") {
            jsonObject.yAxis = {
                title: { text },
            };
        } else if (key === "name") {
            if (currentSeries) {
                jsonObject.series.push({
                    name: currentSeries,
                    data: yValues.slice(1), // Exclude the first null value
                });
                yValues = [];
            }
            currentSeries = text;
        } else if (currentSeries && row[1] !== undefined) {
            yValues.push(Number(row[1]));
        }
    });

    if (currentSeries) {
        jsonObject.series.push({
            name: currentSeries,
            data: yValues.slice(1), // Exclude the first null value
        });
    }

    return JSON.stringify(jsonObject, null, 2);
}


function buildColumnOptions(data) {
    data.chart = {
        type: "column",
    };

    return data;
}

module.exports = { buildColumnOptions };

export { getJsonFromCSVString };
