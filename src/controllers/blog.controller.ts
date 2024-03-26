import { NextFunction, Request, Response } from 'express';

import { BlogAttributes } from '../database/models/blog';

import blogServices from '../services/blog.service';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query;

    const { blogs, count } = await blogServices.getAllBlogs(+page, +limit);

    res.status(200).json({
      message: 'You get all blogs successfully',
      data: blogs,
      count
    });
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const blogValues = req.body as BlogAttributes;
    // @ts-ignore
    blogValues.userId = req.userId;

    const newBlog = await blogServices.createBlog(blogValues);

    res.status(200).json({
      message: 'You created new blogs successfully',
      data: newBlog
    });
  } catch (e) {
    next(e);
  }
}

async function deleteBlog(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const { userId } = req;

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

    return res.json({
      data: blog
    });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updatedBlogValues = req.body as BlogAttributes;
    // @ts-ignore
    updatedBlogValues.userId = req.userId;

    const updatedBlog = await blogServices.updateBlog(+id, updatedBlogValues);

    res.status(200).json({
      message: 'Blog updated successfully.',
      data: updatedBlog
    });
  } catch (e) {
    next(e);
  }
}

async function getUserBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { userId } = req;
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
