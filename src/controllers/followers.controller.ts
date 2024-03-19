import { NextFunction, Response, Request } from 'express';
import followersService from '../services/followers.service';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    // const {} = req.body;
    const followers = await followersService.getFollowers(2);

    res.status(200).json({
      followers
    });
  } catch (e) {
    next(e);
  }
}

export default {
  get
};
