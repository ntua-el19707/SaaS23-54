const { Router } = require("express");
const upload = require('./upload.js')
const download = require('./download.js')
const router = Router();
router.use('/',upload);
router.use('/',download);
module.exports = router;
