function buildSeries(series) {
  let return_seires = [];
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
    } else if (s.type == "X") {
      let datax = [];

      s.datax.forEach((d) => {
        datax.push(parseFloat(d));
      });
      let data = [];
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
      let datay = [];

      s.datay.forEach((d) => {
        datay.push(parseFloat(d));
      });

      let data = [];
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
      let data = [];
      for (let i = 0; i < s.datay.length; i++) {
        data.push([s.datax[i]], s.datay[y]);
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
module.exports = { buildSeries };
