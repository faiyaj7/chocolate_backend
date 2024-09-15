import { asyncTryCatch } from "../middleware/promiseHandling.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModal.js";

export const getAllProducts = asyncTryCatch(async (req, res, next) => {
  const products = await Product.find().populate(
    "category"
  );;
  res.status(200).json(products);
});

export const createNewProduct = asyncTryCatch(async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
    imageUrl: req.file.path,
  });
  await newProduct.save();
  res.status(201).json(newProduct);
});

export const updateProduct = asyncTryCatch(async (req, res, next) => {
  console.log(req.body);

  const newProduct = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!newProduct) return next(new ErrorHandler("Product not found", 400));
  res.status(200).json(newProduct);
});

export const deleteProduct = asyncTryCatch(async (req, res, next) => {
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Deleted Product Successfully" });
});

export const productBasedOnId = asyncTryCatch(async (req, res, next) => {
  const singleProduct = await Product.find({ _id: req.params.id }).populate(
    "category"
  );
  if (!singleProduct) return next(new ErrorHandler("No Products found", 400));
  res.status(200).json(singleProduct);
});

export const getProductsByCategory = asyncTryCatch(async (req, res,next) => {
  const { categoryId } = req.params;

  // Check if the category exists
  const category = await Category.findById(categoryId);
  if (!category) return next(new ErrorHandler("Category not found", 404));

  // Find products by category
  const products = await Product.find({ category: categoryId }).populate(
    "category"
  );

  if (products.length === 0) {
    return next(new ErrorHandler("No Products found", 404));
  }

  res.status(200).json(products);
});

export const searchProduct = asyncTryCatch(async (req, res, next) => {
  const searchProduct = await Product.find({
    name: { $regex: req.body.name, $options: "i" },
  }).populate("category");
  res.status(200).json(searchProduct);
});
