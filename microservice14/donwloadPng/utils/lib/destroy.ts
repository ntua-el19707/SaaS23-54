import { unlinkSync } from "fs";

/**
 * destroy - function to delete a file
 * @param fileName name of the file to delete
 * @returns true if the file was deleted successfully, false otherwise
 */
function destroy(fileName: string): boolean {
  const path = `utils/Files/png/${fileName}`; // change the path to the directory containing png files
  try {
    unlinkSync(path); // delete the file
    return true;
  } catch (err) {
    return false;
  }
}

export { destroy }; // export the function for use in other files
