import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Chocolate-Ecommerce",
    allowedFormat: ["jpeg", "png", "jpg"],
  },
});

export const upload = multer({ storage });
