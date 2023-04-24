import { Router } from 'express';
import { authMiddleware } from '../middlewares/passport-middlewares.js';

const authRouter = Router();

authRouter.post('/', authMiddleware);

export { authRouter };
