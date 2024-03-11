import { body } from 'express-validator';

export const loginBodyValidator = [
  body('email', 'Please fill email field.').isEmail(),
  body('password', 'Please fill password field.').notEmpty()
];
