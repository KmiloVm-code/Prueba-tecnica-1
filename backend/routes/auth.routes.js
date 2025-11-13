import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.post('/logout', logout);

export default router;