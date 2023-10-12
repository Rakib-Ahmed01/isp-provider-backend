import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import env from '../config';
import { JwtPayload } from '../types/JwtPayload';
import throwApiError from '../utils/throwApiError';

const isRoleAllowed = (roles: Role[], role: Role) => {
  return roles.includes(role);
};

export const auth = (roles: Role[]) => {
  return expressAsyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers['authorization'];

      if (!token) {
        throwApiError(StatusCodes.UNAUTHORIZED, 'Missing Bearer Token');
      }

      let decodedData = {} as JwtPayload;

      try {
        decodedData = jwt.verify(token, env.accessTokenSecret) as JwtPayload;
        req.jwtPayload = decodedData;
      } catch (error) {
        throwApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access');
      }

      if (!isRoleAllowed(roles, decodedData.role)) {
        return throwApiError(StatusCodes.FORBIDDEN, 'Forbidden Access');
      }

      return next();
    },
  );
};
