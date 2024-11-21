const mongoose = require("mongoose");

const shippingStatusSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",  // Reference to the Order model
    required: true,
  },
  status: {
    type: String,
    enum: ["Getting Items Ready", "Items Shipped", "Delivered"],
    default: "Getting Items Ready",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ShippingStatus = mongoose.model("ShippingStatus", shippingStatusSchema);

module.exports = ShippingStatus;
