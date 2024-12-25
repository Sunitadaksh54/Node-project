import express from 'express';
import { addToCart,getCartItems,updateCartItem,removeCartItem} from '../Controller/cartController.js'; 
//import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/',  addToCart);
router.get('/', getCartItems);
router.put('/:id',  updateCartItem);
router.delete('/:id', removeCartItem);

export default  router;
