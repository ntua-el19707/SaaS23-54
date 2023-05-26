const { Router } = require("express");
const { saveDB } = require("../controllers/upload");
const { auth } = require("../middlewares/auth");

const router = Router();
router.use(auth);
router.post("/confirm", saveDB);

module.exports = router;
