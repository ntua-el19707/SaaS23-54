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
  console.log(axis);
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

 


function validateInput(data) {
return  true ;
}
module.exports = { validateInput };
