import { Router } from 'express';

import userRouter from './user.router';
import blogRouter from './blog.router';
import likedBlogsRoute from './likedBlogs.route';
import followRouter from './follow.router';

import { checkUser } from '../middleware/checkUser';

const router = Router();

router.use('/', userRouter);
router.use('/', blogRouter);
router.use('/liked-blogs', checkUser, likedBlogsRoute);
router.use('/', followRouter);

export default router;
