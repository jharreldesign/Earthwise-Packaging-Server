const express = require('express');
const router = express.Router();
const Shipping = require('../models/shipping');

// Create a new shipping entry
router.post('/', async (req, res) => {
  const { orderId, shippingAddress, shippingCity, shippingState, shippingPostalCode, shippingCountry, shippingMethod, shippingCost, shippingStatus } = req.body;

  const shipping = new Shipping({
    orderId,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingPostalCode,
    shippingCountry,
    shippingMethod,
    shippingCost,
    shippingStatus
  });

  try {
    const newShipping = await shipping.save();
    res.status(201).json(newShipping);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get shipping details by order ID
router.get('/:orderId', async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ orderId: req.params.orderId });
    if (shipping == null) {
      return res.status(404).json({ message: 'Cannot find shipping details' });
    }
    res.json(shipping);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update shipping details
router.patch('/:orderId', async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ orderId: req.params.orderId });
    if (shipping == null) {
      return res.status(404).json({ message: 'Cannot find shipping details' });
    }

    Object.assign(shipping, req.body);
    const updatedShipping = await shipping.save();
    res.json(updatedShipping);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
