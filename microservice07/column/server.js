/**
 * load sercice line into a port
 * @author el18610
 */
const app = require("./app"); // get express server services
const port = 3006; //service will listen
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
