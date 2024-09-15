import { asyncTryCatch } from "../middleware/promiseHandling.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { createToken } from "../utils/auth.js";
import Category from "../models/categoryModal.js";

export const getAllCategories = asyncTryCatch(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

export const createNewCategory = asyncTryCatch(async (req, res, next) => {
  const newCategory = new Category({
    name: req.body.name,
    imageUrl: req.file.path,
  });
  await newCategory.save();
  res.status(201).json(newCategory);
});

export const updateCategory = asyncTryCatch(async (req, res, next) => {
  const newCategory = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  await newCategory.save();
  res.status(201).json(newCategory);
});

export const deleteCategory = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const categories = await Category.deleteOne({ _id: id });
  res.status(200).json(categories);
});
