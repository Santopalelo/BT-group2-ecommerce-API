const mongoose = require('mongoose');
const Product = require('../models/product.model');

const requireOwnerOrAdmin = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (user.role !== 'admin' && product.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied, owner or admin only' });
    }

    req.product = product;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = requireOwnerOrAdmin;
