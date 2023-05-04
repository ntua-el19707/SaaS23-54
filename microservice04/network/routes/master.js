const { Router } = require("express");
const upload = require("./upload.js");
const router = Router();
router.use("/", upload);
module.exports = router;
