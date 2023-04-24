import { Router } from 'express';
import { authMiddleware } from '../middlewares/passport-middlewares.js';

const authRouter = Router();

authRouter.post('/login', authMiddleware.isLoginSucceed);
authRouter.get('/logout', authMiddleware.logout);

export { authRouter };
