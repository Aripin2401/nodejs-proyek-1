import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/Product.js';

const router =  express.Router();

router.get('/product/', getProducts);
router.get('/product/:id', getProductById);
router.post('/product/', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;