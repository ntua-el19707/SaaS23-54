const { Router } = require("express");
const router = Router();
const { saveDB } = require("../controllers/upload");

//confirm route
router.post("/confirm", saveDB);
module.exports = router;
