import { Router } from 'express';

import userRouter from './user.router';
import blogRouter from './blog.router';
import likedBlogsRoute from './likedBlogs.route';
import followersController from '../controllers/followers.controller';

const router = Router();

router.use('/', userRouter);
router.use('/', blogRouter);
router.use('/liked-blogs', likedBlogsRoute);

router.route('/followers').get(followersController.get);
export default router;
