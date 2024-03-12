import { Router } from 'express';

import { blogController } from '../controllers/blog.controller';

import { validate } from '../middleware/validate';
import { createBlogBodyValidator } from '../validators/blogValidator';

import { checkUser } from '../middleware/checkUser';
import multer from 'multer';
import { storage } from '../config/multerConfig';

const router = Router();
const upload = multer({ storage });

router
  .route('/blog/:id')
  .get(blogController.get)
  .post(checkUser, blogController.update)
  .delete(checkUser, blogController.deleteBlog);

router.route('/blog').post(upload.single('image'), checkUser, blogController.create);
router.route('/blogs').get(blogController.getAll);

export default router;
