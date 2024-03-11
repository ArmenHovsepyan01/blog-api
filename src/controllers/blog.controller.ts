import { Request, Response } from 'express';

import { BlogAttributes } from '../database/models/blog';

import blogServices from '../services/blog.service';
async function getAll(req: Request, res: Response) {
  try {
    const blogs = await blogServices.getAllBlogs();

    res.status(200).json({
      blogs
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function create(req: Request, res: Response) {
  try {
    const blogValues = req.body as BlogAttributes;

    const newBlog = await blogServices.createBlog(blogValues);

    res.status(200).json({
      blog: newBlog
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function deleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const message = await blogServices.deleteBlog(+id);

    res.status(200).json({
      message
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const blog = await blogServices.getBlog(+id);

    res.status(200).json({
      blog
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedBlogValues = req.body as BlogAttributes;

    const updatedBlog = await blogServices.updateBlog(+id, updatedBlogValues);

    res.status(200).json({
      message: 'Blog updated successfully.',
      blog: updatedBlog
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

export const blogController = {
  get,
  getAll,
  create,
  update,
  deleteBlog
};
