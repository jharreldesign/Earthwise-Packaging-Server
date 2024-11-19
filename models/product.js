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
      trim: true, 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    // rating: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   required: true, 
    // },
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
      min: 0, 
    },
    productImage: {
      type: String,
      required: true,
      default: "default-image.jpg", 
      validate: {
        validator: (v) => /^https?:\/\//.test(v), 
        message: "Invalid image URL",
      },
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
productSchema.index({ productPrice: 1 });
productSchema.index({ productCategory: 1 });

// Create and export the models
const Product = mongoose.model("Product", productSchema);
const Review = mongoose.model("Review", reviewSchema)
module.exports = { Product, Review };
