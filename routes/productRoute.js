import express from "express";
import { checkAdmin } from "../utils/auth.js";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  productBasedOnId,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../config/multerConfig.js";
const router = express.Router();

router.post("/new", checkAdmin, upload.single("imageUrl"), createNewProduct);
router.get("/", getAllProducts);
router.get("/:id", productBasedOnId);
router.get("/category/:categoryId", getProductsByCategory);
router.post("/search", searchProduct);
router.put("/:id", checkAdmin, upload.single("imageUrl"), updateProduct);
router.delete("/:id", checkAdmin, deleteProduct);

export default router;
