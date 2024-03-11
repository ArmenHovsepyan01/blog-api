import { body } from 'express-validator';

export const resetPasswordValidator = [body('email', 'Please write correct email.').isEmail()];
