const { Router } = require("express");
const download = require("./download.js");
//create a Router
const router = Router();

router.use("/", download); //use download router
module.exports = router;
