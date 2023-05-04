const { Router } = require("express");
const { saveDB } = require("../controllers/upload");

const router = Router();

router.post("/confirm", saveDB);

module.exports = router;
