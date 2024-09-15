import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true },
    description: { type: String, required: false, default: "Test description" },
    price: { type: Number, required: true, min: 1 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Referencing the Category model
      required: true,
    },
    brand: { type: String, default: "No brand Added" },
    stock: { type: Number, default: 1 },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
