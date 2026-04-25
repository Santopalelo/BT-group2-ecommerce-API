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
const requireAdmin = require("../middleware/requireAdmin"); 
const { validateProduct, validateProductUpdate } = require("../Validation/product.validation.js");

router.post("/", requireAuth, requireAdmin, validateProduct, createProduct);     // admin only
router.get("/", requireAuth, getProducts);                                        //  any user
router.get("/:id", requireAuth, getProductById);                                  //  any user
router.put("/:id", requireAuth, requireAdmin, validateProductUpdate, updateProduct); //  admin only
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);                 //  admin only

module.exports = router;