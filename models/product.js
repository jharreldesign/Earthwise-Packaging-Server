const mongoose = require("mongoose");

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
    productCategoy: {
      type: String,
      required: true,
    },
    productReview: {
      type: [String],
    }
  },
  { timestamps: true }
);

const Product = mongoose.model(`Product`, productSchema);

module.exports = Product;
