import { Router } from 'express';
import { blogController } from '../controllers/blog.controller';
import { validate } from '../middleware/validate';
import { createBlogBodyValidator } from '../validators/blogValidator';
import { checkUser } from '../middleware/checkUser';

const router = Router();

router
  .route('/blog/:id')
  .get(blogController.get)
  .post(checkUser, blogController.update)
  .delete(checkUser, blogController.deleteBlog);

router.route('/blog').post(checkUser, validate(createBlogBodyValidator), blogController.create);
router.route('/blogs').get(blogController.getAll);

export default router;
