
import express from 'express';
import { createProduct, getProducts, deleteProductBySku, updateProductBySku } from '../controllers/productController.js';

const router = express.Router();


router.route('/').post(createProduct).get(getProducts);
router.delete('/:sku', deleteProductBySku)
router.put('/:sku', updateProductBySku)


export default router;

