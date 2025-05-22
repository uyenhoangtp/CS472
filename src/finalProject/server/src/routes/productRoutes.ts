import express from 'express';
import { getAllProducts, searchProducts, getProductById } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('', getAllProducts);
productRouter.get('/search', searchProducts);
productRouter.get('/:id', getProductById); // New route for fetching product by ID

export default productRouter;