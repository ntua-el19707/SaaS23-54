const { Router } = require("express");
const router = Router();

const { saveDB } = require("../controllers/upload");
//confirm oute
router.post("/confirm", saveDB);
module.exports = router;
