import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = 3010;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
