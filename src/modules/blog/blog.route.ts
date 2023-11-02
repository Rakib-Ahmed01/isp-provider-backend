import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from './blog.controller';
import { createBlogSchema, updateBlogSchema } from './blog.validation';

export const blogRouter = express.Router();

blogRouter
  .route('/:id')
  .get(getSingleBlog)
  .patch(
    auth(['admin', 'super_admin']),
    validateRequest(updateBlogSchema),
    updateBlog,
  )
  .delete(auth(['admin', 'super_admin']), deleteBlog);

blogRouter
  .route('/')
  .get(getAllBlogs)
  .post(
    auth(['admin', 'super_admin']),
    validateRequest(createBlogSchema),
    createBlog,
  );
