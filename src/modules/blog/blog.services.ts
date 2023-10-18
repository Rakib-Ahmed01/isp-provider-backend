import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import throwApiError from '../../utils/throwApiError';
import { IBlog } from './blog.interface';

export const createBlogService = async (blog: IBlog) => {
  return await prisma.blog.create({
    data: blog,
  });
};

export const getAllBlogsService = async () => {
  return await prisma.blog.findMany({});
};

export const getSingleBlogService = async (id: string) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id,
    },
  });

  if (!blog) {
    throwApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

export const updateBlogService = async (
  id: string,
  payload: Partial<IBlog>,
) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id,
    },
  });

  if (!blog) {
    throwApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteBlogService = async (id: string) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id,
    },
  });

  if (!blog) {
    throwApiError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return await prisma.blog.delete({
    where: {
      id,
    },
  });
};
