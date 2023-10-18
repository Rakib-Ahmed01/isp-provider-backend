import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import throwApiError from '../../utils/throwApiError';
import { IFaq } from './faq.interface';

export const createFaqService = async (faq: IFaq) => {
  return await prisma.faq.create({
    data: faq,
  });
};

export const getAllFaqsService = async () => {
  return await prisma.faq.findMany({});
};

export const getSingleFaqService = async (id: string) => {
  const faq = await prisma.faq.findFirst({
    where: {
      id,
    },
  });

  if (!faq) {
    throwApiError(StatusCodes.NOT_FOUND, 'Faq not found');
  }

  return faq;
};

export const updateFaqService = async (id: string, payload: Partial<IFaq>) => {
  const faq = await prisma.faq.findFirst({
    where: {
      id,
    },
  });

  if (!faq) {
    throwApiError(StatusCodes.NOT_FOUND, 'Faq not found');
  }

  return await prisma.faq.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteFaqService = async (id: string) => {
  const faq = await prisma.faq.findFirst({
    where: {
      id,
    },
  });

  if (!faq) {
    throwApiError(StatusCodes.NOT_FOUND, 'Faq not found');
  }

  return await prisma.faq.delete({
    where: {
      id,
    },
  });
};
