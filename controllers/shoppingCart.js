const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/shoppingCart');

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne();
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ products: [], message: 'Cart is empty.' });
    }

    // Calculate total price for each item in the cart
    cart.items.forEach(item => {
      item.totalPrice = item.productPrice * item.quantity; // Calculate total price
    });

    res.json({ products: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve cart items.' });
  }
});



// Add item to cart
router.post('/', async (req, res) => {
  const { productId, productName, productPrice, productImage, quantity = 1 } = req.body;

  if (!productId || !productName || !productPrice || !productImage) {
    return res.status(400).json({ message: 'All product fields are required.' });
  }

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
    res.status(201).json({ items: updatedCart.items, message: 'Item added to cart.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart.' });
  }
});

// Update item quantity in the cart
router.put('/:itemId', async (req, res) => {  // Change PATCH to PUT
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1.' });
  }

  try {
    const cart = await ShoppingCart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    item.quantity = quantity; // Update quantity
    const updatedCart = await cart.save();
    res.json({ items: updatedCart.items, message: 'Cart item quantity updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart item.' });
  }
});



// Delete an item from the cart
router.delete('/:itemId', async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    cart.items.splice(itemIndex, 1); // Remove the item
    const updatedCart = await cart.save();
    res.json({ items: updatedCart.items, message: 'Item removed from cart.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete cart item.' });
  }
});

module.exports = router;
