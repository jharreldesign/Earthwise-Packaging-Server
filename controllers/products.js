const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Product = require("../models/product");
const router = express.Router();

router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productImage,
      productQuantity,
      productSku,
      manufacturerSku,
      productReview,
      productCategory,
    } = req.body;

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productImage,
      productQuantity,
      productSku,
      manufacturerSku,
      productReview,
      productCategory,
    });
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
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

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Create Review
router.post("/:productId/reviews", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const product = await Product.findById(req.params.productId);
    console.log("product", product);
    product.reviews.push(req.body);
    await product.save();

    // Find the newly created review:
    const newReview = product.reviews[product.reviews.length - 1];

    newReview._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Review
router.put("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const review = product.reviews.id(req.params.reviewId);
    review.text = req.body.text;
    await product.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Review
router.delete("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.remove({ _id: req.params.reviewId });
    await product.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
