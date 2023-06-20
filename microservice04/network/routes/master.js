const { Router } = require("express");
const upload = require("./upload.js");
const { auth } = require("../middlewares/auth.js");
const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ msg: "service  is  up" });
});
router.use(auth);
router.use("/", upload);
module.exports = router;
