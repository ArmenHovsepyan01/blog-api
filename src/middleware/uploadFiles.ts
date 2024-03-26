import multer from 'multer';
import { storage } from '../config/multerConfig';
import { Request } from 'express';

const uploadFiles = multer({
  storage,
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    // @ts-ignore
    if (!req.userId) return callback(new Error('Unsupported files'));

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif|webp)$/)) {
      return callback(new Error('Unsupported files'));
    }

    callback(null, true);
  }
});

export default uploadFiles.single('image');
