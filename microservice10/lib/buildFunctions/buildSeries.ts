function buildSeries(series: any[]) {
  series.forEach((s: any) => {
    if (s.type == "XY") {
      let xarray: Number[] = [];
      let yarray: Number[] = [];
      s.data = [];
      s.datax.forEach((x: string) => {
        xarray.push(parseFloat(x));
      });
      s.datay.forEach((y: string) => {
        yarray.push(parseFloat(y));
      });
      for (let i = 0; i < xarray.length; i++) {
        s.data.push([xarray[i], yarray[i]]);
      }
    } else if (s.type == "double") {
      let data: Number[] = [];
      s.data.forEach((d: string) => {
        data.push(parseFloat(d));
      });
      s.data = data;
    }
  });
  return series;
}
/**
 * BuildPollarSeries
 * @param {*} series array string
 * @returns  array number
 */
function buildPollarSeries(series: any[]) {
  series.forEach((s) => {
    let array: number[] = [];
    s.data.forEach((d: string) => {
      array.push(parseFloat(d));
    });
    s.data = array;
  });

  return series;
}
export { buildSeries, buildPollarSeries };
