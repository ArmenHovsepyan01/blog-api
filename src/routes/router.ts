import { Router } from 'express';

import userRouter from './user.router';
import blogRouter from './blog.router';

const router = Router();

router.use('/', userRouter);
router.use('/', blogRouter);

export default router;
