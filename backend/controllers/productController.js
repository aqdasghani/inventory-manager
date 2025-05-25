import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, quantity, price } = req.body;

  if (!name || !sku || quantity == null || price == null) {
    res.status(400);
    throw new Error("All fields (name, sku, quantity, price) are required.");
  }

  const product = await Product.create({ name, sku, quantity, price });
  res.status(201).json(product);
});


export const getProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find();
  res.json(products);
});


export const deleteProductBySku = async (req, res) => {
  const { sku } = req.params;
  
  try {
    const deleted = await Product.findOneAndDelete({ sku });
    if (!deleted)
      return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const updateProductBySku = async (req, res) => {
  const { sku } = req.params;
  const updateData = req.body;
  const updated = await Product.findOneAndUpdate({ sku }, updateData, { new: true });
  res.json(updated);
}



