const express = require("express");
const { uploadCSV, upload } = require("../controllers/uploadController");
const router = express.Router();

router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;
