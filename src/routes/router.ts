import { Router } from 'express';

import userRouter from './user.router';
import blogRouter from './blog.router';
import likedBlogsRoute from './likedBlogs.route';

const router = Router();

router.use('/', userRouter);
router.use('/', blogRouter);
router.use('/liked-blogs', likedBlogsRoute);
export default router;
