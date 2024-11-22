const express = require('express');
const router = express.Router();
// const ShippingStatus = require('../models/ShippingStatus');

// Create a new shipping entry
router.post('/', async (req, res) => {
  const { orderId, shippingAddress, shippingCity, shippingState, shippingPostalCode, shippingCountry, shippingMethod, shippingCost, shippingStatus } = req.body;

  const shipping = new ShippingStatus({
    orderId,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingPostalCode,
    shippingCountry,
    shippingMethod,
    shippingCost,
    shippingStatus: shippingStatus || "Getting Items Ready" // Default status if not provided
  });

  try {
    const newShipping = await shipping.save();
    res.status(201).json(newShipping);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Shipping Status by Order ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = await ShippingStatus.findOne({ orderId });

    if (!status) {
      return res.status(404).json({ message: 'Shipping status not found' });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Shipping Status by Order ID
router.patch('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Getting Items Ready", "Items Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedStatus = await ShippingStatus.findOneAndUpdate(
      { orderId },
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "Shipping status not found" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
