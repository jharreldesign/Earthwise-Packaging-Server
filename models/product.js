const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    recommend: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true, // Ensures no leading or trailing spaces
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures every review is associated with a user
    },
  },
  { timestamps: true }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0, // Ensures price is non-negative
    },
    productImage: {
      type: String,
      required: true,
      default: "default-image.jpg", // Default image if none is provided
    },
    productQuantity: {
      type: Number,
      required: true,
      min: 0, // Ensures quantity is non-negative
    },
    productSku: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate SKUs
      trim: true,
    },
    manufacturerSku: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [reviewSchema], // Embedding the review schema
  },
  { timestamps: true }
);

// Index frequently queried fields for better performance
productSchema.index({ productName: 1 });
productSchema.index({ productSku: 1 });

// Create and export the models
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
