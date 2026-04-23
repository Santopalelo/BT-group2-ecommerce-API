const mongoose = require("mongoose");
const Product = require("../models/product.model");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.validatedData);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL (Pagination, Search, Sort, Filter)
exports.getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort, search, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let query = {};

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter
    if (category) {
      query.category = category;
    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort) {
      productsQuery = productsQuery.sort(sort);
    }

    // Pagination
    const products = await productsQuery
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};