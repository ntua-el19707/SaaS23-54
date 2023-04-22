function buildSeries(series) {
  series.forEach((s) => {
    if (s.type == "XY") {
      let xarray = [];
      let yarray = [];
      s.data = [];
      s.datax.forEach((x) => {
        xarray.push(parseFloat(x));
      });
      s.datay.forEach((y) => {
        yarray.push(parseFloat(y));
      });
      for (let i = 0; i < xarray.length; i++) {
        s.data.push([xarray[i], yarray[i]]);
      }
    } else if (s.type == "double") {
      let data = [];
      s.data.forEach((d) => {
        data.push(parseFloat(d));
      });
      s.data = data;
    }
  });
  return series;
}
module.exports = { buildSeries };
