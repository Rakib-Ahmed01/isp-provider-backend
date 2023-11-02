import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from '../../types/JwtPayload';
import { pickOptions } from '../../utils/pickOptions';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from './user.interface';
import {
  deleteUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
} from './user.services';

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { role } = pickOptions(req.query as Record<string, unknown>, [
      'role',
    ]) as { role: IUser['role'] };
    const jwtPayload = req.jwtPayload;
    const users = await getAllUsersService(role, jwtPayload as JwtPayload);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.OK,
      message: 'Users retrieved successfully',
      success: true,
      data: users,
    });
  },
);

export const getSingleUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getSingleUserService(id);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.OK,
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  },
);

export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      success: true,
      data: updatedUser,
    });
  },
);

export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await deleteUserService(id);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.OK,
      message: 'User deleted successfully',
      success: true,
      data: deletedUser,
    });
  },
);
