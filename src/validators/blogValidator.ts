import { body } from 'express-validator';

export const createBlogBodyValidator = [
  body('title', 'Please fill title field').notEmpty(),
  body('content', 'Please fill content for blog.').notEmpty(),
  body('userId', 'User id is missing set id to create blog.').notEmpty()
];
