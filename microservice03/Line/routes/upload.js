const { Router } = require("express");
const { saveDB } = require("../controllers/upload");
const { auth } = require("../middlewares/auth");

const router = Router();
router.get("/", (req, res) => {
  console.log("one");
  res.json({ msg: "ok Service up " });
});
router.use(auth);
router.post("/confirm", saveDB);
router.get("/confirm", (req, res) => {
  console.log("confirm");
  res.json({ msg: "ok" });
});
module.exports = router;
