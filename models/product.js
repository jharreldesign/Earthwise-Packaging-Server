const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    recommend: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productSku: {
      type: String,
      required: true,
    },
    manufacturerSku: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model(`Product`, productSchema);

module.exports = Product;
