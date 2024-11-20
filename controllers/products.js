const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

// Middleware for verifying token (add your token verification logic here)
const verifyToken = require("../middleware/verify-token");
router.use(verifyToken);

// Middleware to check user role
const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).send({ error: "Forbidden: Only admin can perform this action" });
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

// Update a product by ID (Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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

// Create a review for a product (Users allowed)
router.post("/:productId/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send({ error: "Product not found" });

    const review = { ...req.body, author: req.user?._id }; // Assuming user is attached to req
    product.reviews.push(review);
    await product.save();

    const newReview = product.reviews[product.reviews.length - 1];
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

    const review = product.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).send({ error: "Review not found" });

    // Check if the logged-in user is the author of the review
    if (review.author.toString() !== req.user?._id.toString()) {
      return res.status(403).send({ error: "You are not authorized to update this review" });
    }

    review.text = req.body.text;
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
      return res.status(403).send({ error: "You are not authorized to delete this review" });
    }

    review.remove();
    await product.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;




// const express = require("express");
// const { Product } = require("../models/product");
// const router = express.Router();

// // Middleware (uncomment if using token verification)
// // const verifyToken = require("../middleware/verify-token");
// // router.use(verifyToken);

// // Create a new product
// router.post("/", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(201).send(newProduct);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// // Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).send(products);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Get a product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).send({ error: "Product not found" });
//     res.send(product);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Update a product by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!product) return res.status(404).send({ error: "Product not found" });
//     res.send(product);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// // Delete a product by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).send({ error: "Product not found" });
//     res.send({ message: "Product deleted successfully", product });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Create a review for a product
// router.post("/:productId/reviews", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (!product) return res.status(404).send({ error: "Product not found" });

//     const review = { ...req.body, author: req.user?._id }; // Assuming user is attached to req
//     product.reviews.push(review);
//     await product.save();

//     const newReview = product.reviews[product.reviews.length - 1];
//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Update a product review
// router.put("/:productId/reviews/:reviewId", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (!product) return res.status(404).send({ error: "Product not found" });

//     const review = product.reviews.id(req.params.reviewId);
//     if (!review) return res.status(404).send({ error: "Review not found" });

//     review.text = req.body.text;
//     await product.save();
//     res.status(200).json({ message: "Review updated successfully" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Delete a product review
// router.delete("/:productId/reviews/:reviewId", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (!product) return res.status(404).send({ error: "Product not found" });

//     const review = product.reviews.id(req.params.reviewId);
//     if (!review) return res.status(404).send({ error: "Review not found" });

//     review.remove();
//     await product.save();
//     res.status(200).json({ message: "Review deleted successfully" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// module.exports = router;
