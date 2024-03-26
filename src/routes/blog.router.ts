import { Router, Request } from 'express';

import { blogController } from '../controllers/blog.controller';

import { validate } from '../middleware/validate';
import { createBlogBodyValidator } from '../validators/blogValidator';

import { checkUser } from '../middleware/checkUser';

import uploadFiles from '../middleware/uploadFiles';

const router = Router();

router
  .route('/blog/:id')
  .get(blogController.get)
  .post(checkUser, uploadFiles, blogController.update)
  .delete(checkUser, blogController.deleteBlog);

router
  .route('/blog')
  .post(checkUser, uploadFiles, validate(createBlogBodyValidator), blogController.create);

router.route('/blogs').get(blogController.getAll);

router.route('/user-blogs').get(checkUser, blogController.getUserBlogs);

export default router;
