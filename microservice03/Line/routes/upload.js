const { Router } = require("express");
const { saveDB } = require("../controllers/upload");
const { auth } = require("../middlewares/auth");

const router = Router();
router.get("/", (req, res) => {
  res.json({ msg: "ok Service up " });
});
router.use(auth);
router.post("/confirm", saveDB);
router.get("/up", (req, res) => {
  res.status(200).json({ msg: "service  is  up" });
});
module.exports = router;
