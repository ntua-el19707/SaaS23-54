function buildSeries(series) {
  let return_seires = [];
  series.forEach((s) => {
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
  });
  return return_seires;
}
module.exports = { buildSeries };
