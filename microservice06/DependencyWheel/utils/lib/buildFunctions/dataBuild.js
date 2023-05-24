
function buildDependancyWheelOptions(data) {
  let options = {
  };

  if (data.title) {
    options.title = {};
    if (data.title.text) {
        options.title.text = data.title.text;
    }
  };

  options.accessibility = {
    point: {
      valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
    }
  };

  options.series =[ {
    keys: data.series.keys,
    data: data.series.data,
    type: 'dependencywheel',
    name: 'Dependency wheel series',
    dataLabels: {
      color: '#333',
      style: {
        textOutline: 'none'
      },
      textPath: {
        enabled: true
      },
      distance: 10
    },
    size: '95%'
  }]

  



  //TODO  impment  options  builder
  return options;
}

module.exports = { buildDependancyWheelOptions };
