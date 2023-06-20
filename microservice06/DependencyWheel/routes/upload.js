const { Router } = require("express");
const { saveDB } = require("../controllers/upload");
const { auth } = require("../middlewares/auth");

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ msg: "service  is  up" });
});
router.use(auth);
router.post("/confirm", saveDB);

module.exports = router;
