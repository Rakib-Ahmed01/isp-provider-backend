import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IPlan, IReview } from './plan.interface';

const selectPlanProperties: Prisma.PlanSelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  image: true,
  isAvailable: true,
  createdAt: true,
  updatedAt: true,
};

export const createPlanService = async (plan: IPlan) => {
  return await prisma.plan.create({
    data: plan,
  });
};

export const createReviewService = async (
  planId: string,
  review: IReview,
  userId: string | undefined,
) => {
  if (isEmptyObject(review)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing review data');
  }

  if (!userId) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing user id');
  }

  return await prisma.review.create({
    data: {
      ...review,
      plan: {
        connect: {
          id: planId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getAllPlansService = async () => {
  return await prisma.plan.findMany({
    select: selectPlanProperties,
  });
};

export const getSinglePlanService = async (id: string) => {
  const plan = await prisma.plan.findFirst({
    where: {
      id,
    },
    select: {
      ...selectPlanProperties,
      reviews: true,
    },
  });

  if (!plan) {
    throwApiError(StatusCodes.NOT_FOUND, 'Plan not found');
  }

  return plan;
};

export const updatePlanService = async (
  id: string,
  payload: Partial<IPlan>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const plan = await prisma.plan.findFirst({
    where: {
      id,
    },
    select: selectPlanProperties,
  });

  if (!plan) {
    throwApiError(StatusCodes.NOT_FOUND, 'Plan not found');
  }

  return await prisma.plan.update({
    where: {
      id,
    },
    data: payload,
    select: selectPlanProperties,
  });
};

export const deletePlanService = async (id: string) => {
  const plan = await prisma.plan.findFirst({
    where: {
      id,
    },
    select: selectPlanProperties,
  });

  if (!plan) {
    throwApiError(StatusCodes.NOT_FOUND, 'Plan not found');
  }

  return await prisma.plan.delete({
    where: {
      id,
    },
    select: selectPlanProperties,
  });
};
