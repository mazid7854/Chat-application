import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinary.js";

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "profile_pictures", // Cloudinary folder
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: req.params.id, // Use userId as the file name
      overwrite: true, // Replace existing file if it exists
    };
  },
});

// Upload Middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default upload;
