import { body } from 'express-validator';

export const changePasswordValidator = [
  body('password', 'Please fill password field.').notEmpty(),
  body('password', 'Password is too short characters should be at least 6.').isLength({ min: 6 })
];
