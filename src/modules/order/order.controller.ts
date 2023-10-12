import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { PaginationOptions } from '../../types/PaginationOption';
import { pickOptions } from '../../utils/pickOptions';
import { sendResponse } from '../../utils/sendResponse';
import { IOrder } from './order.interface';
import {
  createOrderService,
  deleteOrderService,
  getAllOrdersService,
  getSingleOrderService,
  updateOrderService,
} from './order.services';

export const createOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const order = await createOrderService(req.body);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Order created successfully',
      success: true,
      data: order as unknown as IOrder,
    });
  },
);

export const getAllOrders = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as Record<string, unknown>,
      ['page', 'size', 'sortOrder', 'sortBy'],
    ) as PaginationOptions;

    const result = await getAllOrdersService(paginationOptions);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Orders retrieved successfully',
      success: true,
      data: result.data as unknown as IOrder,
      meta: result.meta,
    });
  },
);

export const getSingleOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await getSingleOrderService(id);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Order retrieved successfully',
      success: true,
      data: order as unknown as IOrder,
    });
  },
);

export const updateOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedOrder = await updateOrderService(id, req.body);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.OK,
      message: 'Order updated successfully',
      success: true,
      data: updatedOrder as unknown as IOrder,
    });
  },
);

export const deleteOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedOrder = await deleteOrderService(id);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.OK,
      message: 'Order deleted successfully',
      success: true,
      data: deletedOrder as unknown as IOrder,
    });
  },
);
