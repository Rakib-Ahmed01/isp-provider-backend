import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IBlog } from './blog.interface';
import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  getSingleBlogService,
  updateBlogService,
} from './blog.services';

export const createBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const blog = await createBlogService(req.body);

    sendResponse<IBlog>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blog created successfully',
      success: true,
      data: blog,
    });
  },
);

export const getAllBlogs = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const blogs = await getAllBlogsService();

    sendResponse<IBlog>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blogs retrieved successfully',
      success: true,
      data: blogs,
    });
  },
);

export const getSingleBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await getSingleBlogService(id);

    sendResponse<IBlog>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blog retrieved successfully',
      success: true,
      data: blog,
    });
  },
);

export const updateBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedBlog = await updateBlogService(id, req.body);

    sendResponse<IBlog>(res, {
      statusCode: StatusCodes.OK,
      message: 'Blog updated successfully',
      success: true,
      data: updatedBlog,
    });
  },
);

export const deleteBlog = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedBlog = await deleteBlogService(id);

    sendResponse<IBlog>(res, {
      statusCode: StatusCodes.OK,
      message: 'Blog deleted successfully',
      success: true,
      data: deletedBlog,
    });
  },
);
