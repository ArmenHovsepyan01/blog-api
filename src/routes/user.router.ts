import { Router } from 'express';

import { userController } from '../controllers/user.controller';

import { validate } from '../middleware/validate';

import { registerBodyValidator } from '../validators/registerBodyValidator';
import { loginBodyValidator } from '../validators/loginBodyValidator';
import { changePasswordValidator } from '../validators/changePasswordValidator';
import { resetPasswordValidator } from '../validators/resetPasswordValidator';

import { checkUserPrivilegies } from '../middleware/checkUserPrivilegies';

const router = Router();

router.route('/register').post(validate(registerBodyValidator), userController.register);
router.route('/verify').post(userController.verify);
router.route('/login').post(validate(loginBodyValidator), userController.login);
router
  .route('/reset-password')
  .post(validate(resetPasswordValidator), userController.requestToChangePassword);
router
  .route('/change-password')
  .post(checkUserPrivilegies, validate(changePasswordValidator), userController.changePassword);

export default router;
