const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/shoppingCart'); 

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne();
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  const { productId, productName, productPrice, productImage, quantity } = req.body;

  try {
    let cart = await ShoppingCart.findOne();
    if (!cart) {
      cart = new ShoppingCart({ items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, productName, productPrice, productImage, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart.items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item from the cart
router.delete('/:itemId', async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    const updatedCart = await cart.save();
    res.json(updatedCart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
