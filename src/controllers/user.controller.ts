import { Request, Response } from 'express';
import userServices from '../services/user.services';

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await userServices.getUser(+id);

    res.status(200).json({
      user
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}
