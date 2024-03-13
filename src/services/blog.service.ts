import { BlogAttributes } from '../database/models/blog';
import { Blog } from '../database/models/models';
import { CustomError } from '../errors/customError';

async function getBlog(id: number) {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) return {};

    return blog;
  } catch (e) {
    throw e;
  }
}

async function getAllBlogs() {
  try {
    return Blog.findAll({
      where: {
        isPublished: true
      }
    });
  } catch (e) {
    throw e;
  }
}

async function createBlog(values: BlogAttributes) {
  try {
    const newBlog = await Blog.create(values);

    console.log(newBlog);

    return newBlog;
  } catch (e) {
    throw e;
  }
}

async function deleteBlog(id: number, userId: number) {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) throw new CustomError("Blog doesn't exist.", 404);

    if (blog.dataValues.userId !== userId) throw new CustomError('User access denied.', 401);

    await Blog.destroy({
      where: {
        id
      }
    });

    return 'Blog deleted successfully.';
  } catch (e) {
    throw e;
  }
}

async function updateBlog(id: number, values: BlogAttributes) {
  try {
    if (!values) throw new CustomError('Values are empty there is nothing to update.', 400);

    const blog = await Blog.findByPk(id);

    if (!blog) throw new CustomError("Blog doesn't exist.", 404);

    if (blog.dataValues.userId !== values.userId) throw new CustomError('User access denied.', 401);

    await Blog.update(values, {
      where: {
        id
      }
    });

    return {
      ...blog.dataValues,
      ...values
    };
  } catch (e) {
    throw e;
  }
}

const blogServices = {
  getBlog,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
};

export default blogServices;
