import { BlogAttributes } from '../database/models/blog';
import { Blog } from '../database/models/models';

async function getBlog(id: number) {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) return {};

    return blog;
  } catch (e) {
    throw new Error(e);
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
    throw new Error(e);
  }
}

async function createBlog(values: BlogAttributes) {
  try {
    const newBlog = await Blog.create(values);

    console.log(newBlog);

    return newBlog;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteBlog(id: number, userId: number) {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) throw new Error("Blog doesn't exist.");

    if (blog.dataValues.userId !== userId) throw new Error('User access denied.');

    await Blog.destroy({
      where: {
        id
      }
    });

    return 'Blog deleted successfully.';
  } catch (e) {
    throw new Error(e);
  }
}

async function updateBlog(id: number, values: BlogAttributes) {
  try {
    if (!values) return 'Values are empty there is nothing to update.';

    const blog = await Blog.findByPk(id);

    if (!blog) throw new Error("Blog doesn't exist.");

    if (blog.dataValues.userId !== values.userId) throw new Error('User access denied.');

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
    throw new Error(e);
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
