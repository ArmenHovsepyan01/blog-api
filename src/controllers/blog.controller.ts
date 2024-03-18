import { NextFunction, Request, Response } from 'express';

import { BlogAttributes } from '../database/models/blog';

import blogServices from '../services/blog.service';
import user from '../database/models/user';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query;

    const { blogs, count } = await blogServices.getAllBlogs(+page, +limit);

    res.status(200).json({
      blogs,
      count
    });
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const blogValues = req.body as BlogAttributes;

    const newBlog = await blogServices.createBlog(blogValues);

    res.status(200).json({
      blog: newBlog
    });
  } catch (e) {
    next(e);
  }
}

async function deleteBlog(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const message = await blogServices.deleteBlog(+id, userId);

    res.status(200).json({
      message
    });
  } catch (e) {
    next(e);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const blog = await blogServices.getBlog(+id);

    res.status(200).json({
      blog
    });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updatedBlogValues = req.body as BlogAttributes;
    console.log(updatedBlogValues, 'values');

    const updatedBlog = await blogServices.updateBlog(+id, updatedBlogValues);

    res.status(200).json({
      message: 'Blog updated successfully.',
      blog: updatedBlog
    });
  } catch (e) {
    next(e);
  }
}

async function getUserBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.body;
    const data = await blogServices.getUserBlogs(userId);

    res.status(200).json({
      message: 'User blogs retrieved successfully.',
      data
    });
  } catch (e) {
    next(e);
  }
}

export const blogController = {
  get,
  getAll,
  create,
  update,
  deleteBlog,
  getUserBlogs
};
