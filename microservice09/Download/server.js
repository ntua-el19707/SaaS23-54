/**
 * load sercice Download into a port
 * @author el19707
 */
const app = require("./app"); // get express server services
const port = 3007; //service will listen
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
