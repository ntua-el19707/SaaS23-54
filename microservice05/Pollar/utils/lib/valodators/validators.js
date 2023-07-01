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
  if (!subtitle) {
    return true;
  }
  if (subtitle.align) {
    if (!text_align.includes(subtitle.align)) {
      return false;
    }
  }
  return true;
}

function validSeries(data) {
  let rsp = true;
  const validTypes = ["column", "area", "line"];
  if (!Array.isArray(data)) {
    return false;
  }
  data.forEach((item) => {
    if (item.type && item.data && item.name) {
      if (!validTypes.includes(item.type)) {
        rsp = false;
      }
      if (!Array.isArray(item.data)) {
        rsp = false;
      } else {
        item.data.forEach((d) => {
          if (isNaN(Number(d))) {
            // Use Number(d) to convert the value to a number before checking
            rsp = false;
          }
        });
      }
    } else {
      rsp = false;
    }
  });

  return rsp; // Return the final response value
}
function validPlot(plot) {
  if (plot.start && plot.iterval) {
    if (!isNaN(plot.start) && !isNaN(plot.iterval)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function validateInput(data) {
  //TODO implement  validator

  data.subtitle = data.Subtitle;
  console.log(data.plotOptions);
  return (
    title(data.title) &&
    validPlot(data.plotOptions) &&
    subtitle(data.Subtitle) &&
    validSeries(data.series)
  );
}

module.exports = { validateInput };
