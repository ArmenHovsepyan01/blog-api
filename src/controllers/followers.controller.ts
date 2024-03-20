import { NextFunction, Response, Request } from 'express';
import followersService from '../services/followers.service';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await followersService.createFollower(req.body);
    console.log(message);

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
