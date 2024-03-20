import { Router } from 'express';
import { checkUser } from '../middleware/checkUser';

import followersController from '../controllers/followers.controller';

const router = Router();

router.route('/follow').post(checkUser, followersController.create);

export default router;
