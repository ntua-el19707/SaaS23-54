/**
 * load sercice dependency wheel into a port
 * @author el18716
 */
const app = require("./app"); // get express server services
const port = 3017; //service will listen
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
