import { Router } from 'express';

import { userController } from '../controllers/user.controller';

import { validate } from '../middleware/validate';

import { registerBodyValidator } from '../validators/registerBodyValidator';
import { loginBodyValidator } from '../validators/loginBodyValidator';
import { changePasswordValidator } from '../validators/changePasswordValidator';
import { resetPasswordValidator } from '../validators/resetPasswordValidator';

import { checkUser } from '../middleware/checkUser';
import user from '../database/models/user';

const router = Router();

router.route('/register').post(validate(registerBodyValidator), userController.register);
router.route('/verify').get(userController.verify);
router.route('/login').post(validate(loginBodyValidator), userController.login);
router
  .route('/reset-password')
  .post(validate(resetPasswordValidator), userController.requestToChangePassword);
router
  .route('/change-password')
  .post(checkUser, validate(changePasswordValidator), userController.changePassword);

router.route('/auth').get(checkUser, userController.auth);

router.route('/user/:id').get(userController.getInfo);
router.route('/user-followings-blogs').get(checkUser, userController.getFollowingsBlogs);

router.route('/followers/:id').get(userController.getFollowers);
router.route('/followings/:id').get(userController.getFollowings);

export default router;
