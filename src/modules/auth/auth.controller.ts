import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { LoginResponse } from '../../types/LoginResponse';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from '../user/user.interface';
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from './auth.services';

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      success: true,
      data: user,
    });
  },
);

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await loginUserService(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.ENV === 'production',
    httpOnly: true,
  });

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User signed in successfully',
    data: { token: accessToken },
  });
});

export const refreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken, newRefreshToken } =
    await refreshTokenService(refreshToken);

  res.cookie('refreshToken', newRefreshToken, {
    secure: process.env.ENV === 'production',
    httpOnly: true,
  });

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'New access token generated successfully!',
    data: { token: accessToken },
  });
});
