class FileDoesNotExist extends Error {
  constructor(message) {
    super(message);
    this.name = "FileDoesNotExist";
  }
}
class FileIsNotCsv extends Error {
  constructor(message) {
    super(message);
    this.name = "FileIsNotCsv";
  }
}
module.exports = { FileDoesNotExist, FileIsNotCsv };
