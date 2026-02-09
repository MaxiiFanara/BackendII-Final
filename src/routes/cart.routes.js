import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import * as cartController from '../controllers/cart.controller.js';

const router = Router();

router.get('/user/:uid', cartController.getByUser);
router.get('/:cid', cartController.getById);
router.post('/', isAuthenticated, cartController.createCart);
router.post('/:cid/products', isAuthenticated, cartController.addProduct);
router.put('/:cid/products/:pid', isAuthenticated, cartController.updateProductQuantity);
router.delete('/:cid/products/:pid', isAuthenticated, cartController.removeProduct);
router.delete('/:cid', isAuthenticated, cartController.clearCart);
router.delete('/:cid/delete', isAuthenticated, cartController.deleteCart);

export default router;