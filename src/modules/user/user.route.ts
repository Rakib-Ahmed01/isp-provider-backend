import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controller';

export const userRouter = express.Router();

userRouter
  .route('/:id')
  .get(auth(['user', 'admin', 'super_admin']), getSingleUser)
  .patch(auth(['user', 'admin', 'super_admin']), updateUser)
  .delete(auth(['user', 'admin', 'super_admin']), deleteUser);

userRouter.route('/').get(auth(['admin']), getAllUsers);
