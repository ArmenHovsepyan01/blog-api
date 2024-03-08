import userModelFunction from './user';
import blogModelFunction from './blog';
import likedBlogsModelFunction from './likedBlogs';

import db from './';

export const User: ReturnType<typeof userModelFunction> = db.User;
export const Blog: ReturnType<typeof blogModelFunction> = db.Blog;

export const LikedBlogs: ReturnType<typeof likedBlogsModelFunction> = db.LikedBlogs;
