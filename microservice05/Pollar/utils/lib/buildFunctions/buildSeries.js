/**
 * Build Series
 * @param {*} series array string
 * @returns  array number
 */
function buildSeries(series) {
  series.forEach((s) => {
    let array = [];
    s.data.forEach((d) => {
      array.push(parseFloat(d));
    });
    s.data = array;
  });

  return series;
}
module.exports = { buildSeries };
