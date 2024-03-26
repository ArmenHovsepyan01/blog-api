import fs from 'fs/promises';
import path from 'path';

const deleteImage = async (relativePath: string) => {
  try {
    const absolutePath = path.join(path.resolve('../../public/images'), relativePath);
    await fs.unlink(absolutePath);
  } catch (e) {
    throw new Error(e);
  }
};

export default deleteImage;
