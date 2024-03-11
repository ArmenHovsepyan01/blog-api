import { body } from 'express-validator';

export const registerBodyValidator = [
  body('firstName', 'Please fill firstname field.').notEmpty().isString(),
  body('lastName', 'Please fill lastname field.').notEmpty().isString(),
  body('email', 'Please fill email field.').isEmail(),
  body('password', 'Please fill password field.').notEmpty(),
  body('password', 'Password is too short characters should be at least 6.').isLength({ min: 6 })
];
