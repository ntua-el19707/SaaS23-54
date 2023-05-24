function buildLineAnnotationsOptions(data) {
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

    module.exports = { buildLineAnnotationsOptions };
