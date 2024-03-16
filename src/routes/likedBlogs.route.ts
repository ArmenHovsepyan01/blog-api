import { Router } from 'express';
import likedPostController from '../controllers/likedPost.controller';
import { checkUser } from '../middleware/checkUser';

const router = Router();

router.route('/').get(checkUser, likedPostController.get);
router.route('/').post(checkUser, likedPostController.create);
router.route('/:id').delete(checkUser, likedPostController.deleteLikedBlog);

export default router;
