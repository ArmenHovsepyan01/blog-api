import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: 'Missing token.'
      });
    }

    const userInfo = await jwt.verify(token as string, process.env.SECRETKEY);
    // @ts-ignore

    req.body.id = userInfo.id;

    next();
  } catch (e) {
    res.status(401).json({
      message: e.message
    });
  }
}
