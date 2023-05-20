const { Router } = require("express");
const upload = require("./upload.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();
router.use(auth);
router.use("/", upload);

module.exports = router;
