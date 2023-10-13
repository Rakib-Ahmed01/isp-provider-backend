import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { PaginationOptions } from '../../types/PaginationOption';
import { calculateSkip } from '../../utils/calculateSkip';
import { handleSortByAndSortOrder } from '../../utils/handleSortByAndSortOrder';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IOrder } from './order.interface';

const selectOrderProperties: Prisma.OrderSelect = {
  id: true,
  orderDate: true,
  plan: {
    select: {
      title: true,
    },
  },
  user: {
    select: {
      name: true,
    },
  },
  status: true,
  createdAt: true,
  updatedAt: true,
};

export const createOrderService = async (order: IOrder) => {
  return await prisma.order.create({
    data: order,
  });
};

export const getAllOrdersService = async (
  paginationOption: PaginationOptions,
) => {
  const { page, size, skip } = calculateSkip(paginationOption);
  const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOption);

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      take: size,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.order.count(),
  ]);

  return {
    data: orders,
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
  };
};

export const getSingleOrderService = async (id: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    select: {
      ...selectOrderProperties,
    },
  });

  if (!order) {
    throwApiError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return order;
};

export const getOrdersByUserService = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throwApiError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  return await prisma.order.findMany({
    where: {
      userId,
    },
  });
};

export const updateOrderService = async (
  id: string,
  payload: Partial<IOrder>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    select: selectOrderProperties,
  });

  if (!order) {
    throwApiError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return await prisma.order.update({
    where: {
      id,
    },
    data: payload,
    select: selectOrderProperties,
  });
};

export const deleteOrderService = async (id: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    select: selectOrderProperties,
  });

  if (!order) {
    throwApiError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return await prisma.order.delete({
    where: {
      id,
    },
    select: selectOrderProperties,
  });
};
