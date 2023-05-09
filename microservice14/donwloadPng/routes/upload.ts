import { Router, Request, Response, NextFunction } from "express";
import multer from "multer"; // Import multer library for handling file uploads
import { generateRandomString } from "../utils/genarateRandomString"; // Import a custom function for generating random strings
import { AuthRequest, uploadRequest } from "../utils/interfaces/Request";
import { uploadPost } from "../controllers/upload"; // Import the uploadPost function from the upload controller

const UploadRouter = Router(); // Create a new UploadRouterinstance
const path = "utils/Files/png"; // Set the path to the directory where files will be stored

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (
    request: uploadRequest,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    // Specify the destination folder for uploaded files
    callback(null, path);
  },
  filename: function (
    request: uploadRequest,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    // Generate a unique filename for the uploaded file
    const fileName = `${generateRandomString(11)}.png`;
    // Store the filename in the request object for later use
    if (request.MultFilesB) request.MultFilesB.push(fileName);
    // Pass the filename to the callback function
    callback(null, fileName);
  },
});

// Create a multer instance with the storage and file filter configurations
const upload = multer({
  storage: storage,
  fileFilter: (
    req: uploadRequest,
    file: Express.Multer.File,
    cb: (error: any | null, acceptFile: boolean) => void
  ) => {
    // Check if the uploaded file is of type image/png
    if (file.mimetype == "image/png") {
      // Allow the upload to proceed
      cb(null, true);
    } else {
      // Reject the upload and return an error message
      cb(new Error("Only PNG files are allowed"), false);
    }
  },
});

// Define a route for handling file uploads
UploadRouter.route("/upload/:id").post(
  (req: uploadRequest, res: Response, next: NextFunction) => {
    req.MultFilesB = []; // Initialize an empty array to store the filenames of uploaded files
    next(); // Call the next middleware function
  },
  upload.single("file"), // Use the 'single' method to handle a single file upload
  uploadPost // Call the uploadPost function from the upload controller to handle the file upload
);

export { UploadRouter }; // Export the UploadRouterfor use in other files
