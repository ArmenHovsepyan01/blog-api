import { NextFunction, Request, Response } from 'express';

import { BlogAttributes } from '../database/models/blog';

import blogServices from '../services/blog.service';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const blogs = await blogServices.getAllBlogs();

    res.status(200).json({
      blogs
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
    console.log(updatedBlogValues);

    const updatedBlog = await blogServices.updateBlog(+id, updatedBlogValues);

    res.status(200).json({
      message: 'Blog updated successfully.',
      blog: updatedBlog
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
  deleteBlog
};
