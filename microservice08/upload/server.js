/**
 * load sercice upload into a port
 * @author el19707
 */
const app = require("./app"); // get express server services
const port = 3000; //service upload   will listen on port 3000
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
