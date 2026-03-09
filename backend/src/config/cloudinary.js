const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudName = process.env.CLOUD_NAME || process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret =
  process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Cloudinary env vars missing. Set CLOUDINARY_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET (or CLOUD_NAME/CLOUD_API_KEY/CLOUD_API_SECRET)."
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

module.exports = cloudinary;
