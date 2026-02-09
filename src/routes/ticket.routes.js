import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';
import * as ticketController from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', isAuthenticated, isAdmin, ticketController.getAll);
router.get('/purchaser/:email', isAuthenticated, ticketController.getByPurchaser);
router.get('/user/:uid', isAuthenticated, ticketController.getByUser);
router.get('/:tid', isAuthenticated, ticketController.getById);
router.post('/:cid/purchase', isAuthenticated, ticketController.purchaseCart);
router.delete('/:tid', isAuthenticated, isAdmin, ticketController.deleteTicket);

export default router;