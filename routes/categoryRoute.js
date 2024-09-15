import express from "express";
import { createNewUser, loginUser } from "../controllers/userController.js";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { checkAdmin } from "../utils/auth.js";
import { upload } from "../config/multerConfig.js";
const router = express.Router();

router.post("/new", checkAdmin, upload.single("imageUrl"), createNewCategory);
router.get("/all", getAllCategories);
router.put("/:id", checkAdmin, upload.single("imageUrl"), updateCategory);
router.delete("/:id", deleteCategory);
export default router;
