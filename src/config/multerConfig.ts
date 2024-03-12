import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageFolderPath = path.resolve('./public/images');

    cb(null, imageFolderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    req.body.imageUrl = fileName;

    cb(null, fileName);
  }
});
