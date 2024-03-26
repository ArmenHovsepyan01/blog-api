import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: 'Missing authorization headers.'
      });
    }

    const token = req.headers.authorization.trim().split(' ')[1];

    const userInfo = jwt.verify(token, process.env.SECRETKEY);

    // @ts-ignore
    req.userId = userInfo.user_id;

    next();
  } catch (e) {
    res.status(401).json({
      error: {
        message: 'Unauthorized user access denied.'
      }
    });
  }
}
