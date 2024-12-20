const express = require("express");
const Product = require("../database/models/produs");
const { verifyToken } = require('../utils');  

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Product id is not valid' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product found', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
});


router.post("/", verifyToken, async (req, res) => {  
  const { name, price, category, wishlist } = req.body;


  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
  }

  try {
    const newProduct = await Product.create({ name, price, category, wishlist });
    res.status(201).json({ success: true, message: 'Product created', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {  
  const { id } = req.params;
  const { name, price, category, wishlist } = req.body;


  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Product id is not valid' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }


    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.wishlist = wishlist !== undefined ? wishlist : product.wishlist;

    await product.save();

    res.status(200).json({ success: true, message: 'Product updated', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
});


router.delete("/:id", verifyToken, async (req, res) => { 
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Product id is not valid' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
