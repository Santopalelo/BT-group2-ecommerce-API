const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const requireAuth = require("../middleWare/requireAuth");
const requireOwnerOrAdmin = require("../middleWare/requireOwnerOrAdmin.js");
const { validateProduct, validateProductUpdate } = require("../Validation/product.validation.js");
router.use(requireAuth); // all routes require authentication

router.post("/", validateProduct, createProduct);                    // authenticated users can create
router.get("/", getProducts);                                       // any authenticated user
router.get("/:id", getProductById);                                 // any authenticated user
router.put("/:id", requireOwnerOrAdmin, validateProductUpdate, updateProduct); // owner or admin
router.delete("/:id", requireOwnerOrAdmin, deleteProduct);          // owner or admin

module.exports = router;