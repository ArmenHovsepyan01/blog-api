import { NextFunction, Response, Request } from 'express';
import followersService from '../services/followers.service';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    req.body.userId = req.userId;

    const message = await followersService.createFollower(req.body);

    res.status(200).json({
      message
    });
  } catch (e) {
    next(e);
  }
}

export default {
  create
};
