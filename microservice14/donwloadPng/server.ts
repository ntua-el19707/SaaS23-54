import app from "./app";
import dotenv from "dotenv";

// Load the environment variables from .env file
dotenv.config();
const PORT = 3014;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
