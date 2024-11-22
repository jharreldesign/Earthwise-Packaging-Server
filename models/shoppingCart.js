const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
          index: true, 
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
          set: (value) => Number(value.toFixed(2)), 
        },
        productImage: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer.',
          },
          min: [1, 'Quantity must be at least 1.'],
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Virtual property to calculate total price per item
ShoppingCartSchema.virtual('items.totalPrice').get(function () {
  return this.quantity * this.productPrice;
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);