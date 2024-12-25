import { getProducts, getProductById , addProduct } from "../Controller/products.js";
import express from "express";
const router = express.Router();
// Routes for product operations
router.post('/add', addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
export default router;
