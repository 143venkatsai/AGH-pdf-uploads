const File = require("../models/File");
const cloudinary = require("../config/cloudinary")

const uploadPdf = async (req, res) => {
  try {

    const file = req.file;

    const result = await cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "raw",
        folder: "pdfs"
      }
    );

    const newFile = await File.create({
      originalPdf: result.secure_url,
      pdfPublicId: result.public_id
    });

    res.status(200).json({
      fileId: newFile._id,
      pdfUrl: result.secure_url
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteFile = async (req, res) => {

  try {

    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await cloudinary.uploader.destroy(
      file.pdfPublicId,
      { resource_type: "raw" }
    );

    await File.findByIdAndDelete(req.params.id);

    res.json({
      message: "File deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

module.exports = {
  uploadPdf, deleteFile
};