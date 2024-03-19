import { Blog, LikedBlogs, User } from '../database/models/models';
import { CustomError } from '../errors/customError';

import db from '../database/models';

const includes = [
  {
    model: Blog,
    as: 'blog'
  },
  {
    model: User,
    attributes: ['firstName', 'lastName'],
    as: 'user'
  }
];

const attributes = ['id'];

async function getAll(userId: number) {
  try {
    if (!userId) throw new CustomError('Access denied.', 401);

    return await LikedBlogs.findAll({
      where: {
        userId
      },
      include: includes,
      attributes
    });
  } catch (e) {
    throw e;
  }
}

async function create(userId: number, blogId: number) {
  try {
    if (!userId) {
      throw new CustomError('Please log in then add blogs to your liked list', 401);
    }

    if (!blogId) throw new CustomError('Please check blogId field and fill it.', 400);

    const values = {
      userId,
      blogId
    };

    const transaction = await db.sequelize.transaction();

    const likedBlog = await LikedBlogs.findOne({
      where: values
    });

    if (likedBlog) throw new CustomError('You already liked this blog.', 400);

    await LikedBlogs.create(values, {
      include: includes,
      transaction
    });

    const newLikedBlog = await LikedBlogs.findOne({
      where: values,
      include: includes,
      attributes,
      transaction
    });

    await transaction.commit();
    return newLikedBlog;
  } catch (e) {
    throw e;
  }
}

async function removeLikedBlog(userId: number, id: number) {
  try {
    if (!userId) throw new CustomError('Please log in then remove blogs from your liked list', 401);

    if (!id) throw new CustomError('Please check blogId field and fill it.', 400);

    const deletedBlog = await LikedBlogs.destroy({
      where: {
        userId,
        id
      }
    });

    if (deletedBlog === 0) return `There is no liked blog with id ${id}`;

    return 'Blog removed from liked blog list successfully';
  } catch (e) {
    throw e;
  }
}

export default { getAll, removeLikedBlog, create };
