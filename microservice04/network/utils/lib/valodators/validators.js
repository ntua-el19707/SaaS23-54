const text_align = ["left", "right", "center"];

/**
 *
 * @param {*} title json object
 * @return bool
 */
function title(title) {
  if (!title) return true;
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
  if (!subtitle) return true;
  if (subtitle.align) {
    if (!text_align.includes(subtitle.align)) {
      return false;
    }
  }
  return true;
}
function validateSeries(series) {
  if (!series) {
    return false;
  }
  let seriesD = series.data;
  if (!Array.isArray(seriesD)) {
    return false;
  }

  for (let item of seriesD) {
    if (!Array.isArray(item) || item.length !== 2) {
      return false;
    }

    if (!item.every((element) => typeof element === "string")) {
      return false;
    }
  }

  return true;
}

function validateInput(data) {
  console.log(data);
  return (
    title(data.title) && subtitle(data.subtitle) && validateSeries(data.series)
  );
}
module.exports = { validateInput };
