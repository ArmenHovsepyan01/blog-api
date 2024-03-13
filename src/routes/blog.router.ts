import { Router, Request } from 'express';

import { blogController } from '../controllers/blog.controller';

import { validate } from '../middleware/validate';
import { createBlogBodyValidator } from '../validators/blogValidator';

import { checkUser } from '../middleware/checkUser';

import { storage } from '../config/multerConfig';

import multer from 'multer';

const router = Router();

const upload = multer({
  storage,
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif|webp)$/)) {
      return callback(new Error('Unsupported files'));
    }

    callback(null, true);
  }
});

router
  .route('/blog/:id')
  .get(blogController.get)
  .post(checkUser, blogController.update)
  .delete(checkUser, blogController.deleteBlog);

router
  .route('/blog')
  .post(
    upload.single('image'),
    checkUser,
    validate(createBlogBodyValidator),
    blogController.create
  );
router.route('/blogs').get(blogController.getAll);

export default router;
