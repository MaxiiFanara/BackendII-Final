import { Router } from 'express';
import { passportCall } from '../utils/passportCall.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', passportCall('current'), authController.current);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

export default router;