const text_align = ["left", "right", "center"];

/**
 *
 * @param {*} title json object
 * @return bool
 */
function title(title) {
  if (!title.text) {
    return false; //if there is not a title => then false
  }

  if (title.align) {
    if (!text_align.includes(title.align)) {
      return false;
    }
  }

  if (title.color) {
    //color give  in xex
    if (!isHex(title.color)) {
      return false;
    }
  }

  return true;
}
/**
 * function isHex
 * @param h string
 * @return if a string is hex with 6 len
 */
function isHex(h) {
  const format = /^#[0-9A-F]{6}$/i;
  return format.test(h);
}
/**
 * function subtitle
 * @param {*} subtitle string
 * @returns bool
 */
function subtitle(subtitle) {
  if (subtitle.align) {
    if (!text_align.includes(subtitle.align)) {
      return false;
    }
  }
  return true;
}
/**function axis
 * @param axis axis
 * @returns bool
 *  */
function axis(axis) {
  //console.log(axis);
  if (axis.categories) {
    if (!Array.isArray(axis.categories)) {
      return false;
    }
  }
  if (axis.title) {
    return title(axis.title);
  }
  return true;
}
const series_types = ["XY", "double"];
function series(s) {
  let rsp = true;
  s.forEach((series) => {
    //console.log(s);
    if (series.type) {
      if (!series_types.includes(series.type)) {
        rsp = false;
      }

      switch (series.type) {
        case "XY":
          if (!series.datax) {
            rsp = false;
          }
          if (!Array.isArray(series.datax)) {
            rsp = false;
          } else {
            const x = series.datax;
            x.forEach((d) => {
              if (isNaN(d)) {
                return false;
              }
            });
          }
          if (!series.datay) {
            rsp = false;
          }
          if (!Array.isArray(series.datay)) {
            rsp = false;
          } else {
            const y = series.datay;

            y.forEach((d) => {
              if (isNaN(d)) {
                rsp = false;
              }
            });
          }

          break;
        case "double":
          if (!series.data) {
            rsp = false;
          }
          if (!Array.isArray(series.data)) {
            return false;
          } else {
            const data = series.data;

            data.forEach((d) => {
              if (isNaN(d)) {
                rsp = false;
              }
            });
          }

          break;
      }
    } else {
      if (!series.data) {
        rsp = false;
      }
      if (!Array.isArray(series.data)) {
        rsp = false;
      }
    }
    if (!series.name) {
      rsp = false;
    }

    if (series.color) {
      if (!isHex(series.color)) {
        rsp = false;
      }
    }
  });
  return rsp;
}
function validAnot(annL) {
  if (annL.labels) {
    if (!Array.isArray(annL.labels)) {
      return false;
    }
    for (let label of annL.labels) {
      console.log(label);
      const point = label.point;
      if (point) {
        if (
          isNaN(point.xAxis) ||
          isNaN(point.yAxis) ||
          isNaN(point.x) ||
          isNaN(point.y)
        ) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
function valiodateSeries(series) {
  console.log(series);
  if (!Array.isArray(series)) {
    return false;
  } else {
    let rsp = true;
    series.forEach((s) => {
      if (!s.data) {
        rsp = false;
      } else {
        if (!Array.isArray(s.data)) {
          rsp = false;
        } else {
          s.data.forEach((d) => {});
        }
      }
    });
    return rsp;
  }
}
function validateInput(data) {
  return validAnot(data.annotations) && valiodateSeries(data.series);
}
module.exports = { validateInput };
