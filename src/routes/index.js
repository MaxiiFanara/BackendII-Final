import { Router } from 'express';
import sessionRoutes from './session.routes.js';
import productRoutes from "./product.routes.js"
import cartRoutes from './cart.routes.js';
import ticketRoutes from './ticket.routes.js';

const router = Router();

router.use('/sessions', sessionRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use('/tickets', ticketRoutes);

export default router;