const { existsSync } = require("fs");

/**
 * destroy - function  delete a file
 * @params FileName string
 */
function destroy(FileName) {
  const path = `utils/Files/CSV/${FileName}`;
  try {
    unlinkSync(path);
    console.log("delete file" + FileName);
    return true;
  } catch (err) {
    return false;
  }
}
module.exports = { destroy };
