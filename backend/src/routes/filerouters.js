const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploade");
const {
  uploadPdf,
  deleteFile
} = require("../controllers/fileController");

router.post(
  "/upload",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  uploadPdf
);
router.delete("/:id", deleteFile);


module.exports = router;
