import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';
import * as productController from '../controllers/product.controller.js';

const router = Router();

router.get('/available', productController.getAvailable);
router.get('/category/:category', productController.getByCategory);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', isAuthenticated, isAdmin, productController.create);
router.put('/:id', isAuthenticated, isAdmin, productController.update);
router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct);

export default router;