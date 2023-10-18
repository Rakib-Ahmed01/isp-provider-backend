import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IUser } from './user.interface';

const selectUserProperties: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  profileImg: true,
  isBanned: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export const getAllUsersService = async (role: IUser['role']) => {
  if (role !== 'user' && role !== 'admin' && role !== 'super_admin') {
    throwApiError(StatusCodes.BAD_REQUEST, 'Invalid role');
  }

  return await prisma.user.findMany({
    where: {
      role,
    },
    select: selectUserProperties,
  });
};

export const getSingleUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: selectUserProperties,
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

export const updateUserService = async (
  id: string,
  payload: Partial<IUser>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: selectUserProperties,
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: selectUserProperties,
  });
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: selectUserProperties,
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return await prisma.user.delete({
    where: {
      id,
    },
    select: selectUserProperties,
  });
};
