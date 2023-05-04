/**
 * makeid -function
 * @returns string  random
 */
function makeid(length) {
  let result = ""; //empty string
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%^&*"; //aplphabet
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); //get a random character
    counter += 1;
  }
  const timestamp = Date.now();
  result += `_${timestamp}`;
  return result;
}
module.exports = { makeid };
