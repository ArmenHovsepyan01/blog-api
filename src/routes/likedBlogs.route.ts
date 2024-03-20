import { Router } from 'express';
import likedPostController from '../controllers/likedPost.controller';

const router = Router();

router.route('/').get(likedPostController.get);
router.route('/').post(likedPostController.create);
router.route('/:id').delete(likedPostController.deleteLikedBlog);

export default router;
