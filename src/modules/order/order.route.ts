import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrdersByUser,
  getSingleOrder,
  updateOrder,
} from './order.controller';
import { createOrderSchema, updateOrderSchema } from './order.validation';

export const orderRouter = express.Router();

orderRouter.get('/users', auth(['user']), getOrdersByUser);

orderRouter
  .route('/:id')
  .get(auth(['admin', 'user']), getSingleOrder)
  .patch(auth(['admin']), validateRequest(updateOrderSchema), updateOrder)
  .delete(auth(['admin']), deleteOrder);

orderRouter
  .route('/')
  .get(auth(['admin']), getAllOrders)
  .post(auth(['admin']), validateRequest(createOrderSchema), createOrder);
