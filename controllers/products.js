const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

// Middleware for verifying token
const verifyToken = require("../middleware/verify-token");

// Middleware to check user role
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .send({ error: "Forbidden: Only admin can perform this action" });
  }
  next();
};

// Create a new product (Admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all products with pagination, sorting, and filtering
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      category,
      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).send({
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a product by ID with reviews
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.author",
      "name"
    );
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a product by ID (Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
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
router.delete("/:id", verifyAdmin, async (req, res) => {
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
