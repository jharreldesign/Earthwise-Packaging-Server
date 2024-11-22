const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const verifyToken = require('../middleware/verify-token'); 

// Middleware to check user role
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send({ error: "Forbidden: Only admin can perform this action" });
  }
  next();
};

// Create a new product (Admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a product by ID (Admin only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a product by ID (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//--------------- REVIEWS -----------------//
// Create a review for a product (Users allowed)
router.post("/:productId/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    console.log("product", product);
    if (!product) return res.status(404).send({ error: "Product not found" });
    console.log("req.user", req.body);
    const review = { ...req.body, author: req.body.author }; // Assuming user is attached to req
    product.reviews.push(review);
    console.log("product", product);
    let returnObj = await product.save();
    console.log("returnobj", returnObj);

    const newReview = product.reviews[product.reviews.length - 1];
    console.log("new review", newReview);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a product review (Users allowed to update own review)
router.put("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send({ error: "Product not found" });
    console.log("product", product);
    const review = product.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).send({ error: "Review not found" });

    // Check if the logged-in user is the author of the review
    if (review.author.toString() !== req.body.author.toString()) {
      return res
        .status(403)
        .send({ error: "You are not authorized to update this review" });
    }

    review.text = req.body.text;
    review.recommend = req.body.recommend;
    await product.save();
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a product review (Users allowed to delete own review)
router.delete("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send({ error: "Product not found" });

    const review = product.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).send({ error: "Review not found" });

    // Check if the logged-in user is the author of the review
    if (review.author.toString() !== req.user?._id.toString()) {
      return res
        .status(403)
        .send({ error: "You are not authorized to delete this review" });
    }

    review.remove();
    await product.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;