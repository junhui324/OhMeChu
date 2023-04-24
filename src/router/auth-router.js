import { Router } from 'express';
import { authMiddlewares } from '../middlewares/auth-middlewares.js';

const authRouter = Router();

authRouter.get('/myPage', authMiddlewares.isIssueSucceed);
authRouter.post('/login', authMiddlewares.isLoginSucceed);
authRouter.get('/logout', authMiddlewares.logout);

export { authRouter };
