const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploade");
const {
  uploadPdf,
  deleteFile
} = require("../controllers/fileController");


router.post("/upload", upload.single("pdf"), uploadPdf);
router.delete("/:id", deleteFile);


module.exports = router;