const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const requireAuth = require("../middleware/requireAuth");
const { validateProduct, validateProductUpdate } = require("../Validation/product.validation.js");

router.post("/", requireAuth, validateProduct, createProduct);
router.get("/", requireAuth, getProducts);
router.get("/:id", requireAuth, getProductById);
router.put("/:id", requireAuth, validateProductUpdate, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

module.exports = router;