const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Text index for search
productSchema.index({ name: "text" });

module.exports = mongoose.model("Product", productSchema);