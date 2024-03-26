import { NextFunction, Request, Response } from 'express';
import likedBlogsService from '../services/likedBlogs.service';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { userId } = req;

    const likedBlogs = await likedBlogsService.getAll(userId);

    res.status(200).json({
      message: 'Successfully get all liked blogs',
      data: likedBlogs
    });
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { userId } = req;

    const { blogId } = req.body;

    const newLikedBlog = await likedBlogsService.create(userId, blogId);

    res.status(200).json({
      message: 'Blog successfully added to liked blogs.',
      data: newLikedBlog
    });
  } catch (e) {
    next(e);
  }
}

async function deleteLikedBlog(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { userId } = req;

    const { id } = req.params;

    const message = await likedBlogsService.removeLikedBlog(userId, +id);

    res.status(200).json({
      message
    });
  } catch (e) {
    next(e);
  }
}

export default {
  get,
  create,
  deleteLikedBlog
};
