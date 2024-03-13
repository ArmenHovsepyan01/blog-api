import { NextFunction, Request, Response } from 'express';

// TODO: Check with middlware user access

async function get(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (e) {
    next(e);
  }
}

async function deleteLikedBlog(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (e) {
    next(e);
  }
}
