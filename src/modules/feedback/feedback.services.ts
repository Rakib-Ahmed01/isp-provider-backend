import prisma from '../../lib/prisma';
import { PaginationOptions } from '../../types/PaginationOption';
import { calculateSkip } from '../../utils/calculateSkip';
import { handleSortByAndSortOrder } from '../../utils/handleSortByAndSortOrder';
import { IFeedback } from './feedback.interface';

export const createFeedbackService = async (feedback: IFeedback) => {
  return await prisma.feedback.create({
    data: feedback,
  });
};

export const getAllFeedbacksService = async (
  paginationOption: PaginationOptions,
) => {
  const { page, size, skip } = calculateSkip(paginationOption);
  const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOption);

  const [feedbacks, total] = await Promise.all([
    prisma.feedback.findMany({
      take: size,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: {
          select: {
            name: true,
            profileImg: true,
            email: true,
            id: true,
          },
        },
      },
    }),
    prisma.feedback.count(),
  ]);

  return {
    data: feedbacks,
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
  };
};
