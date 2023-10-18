import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IFaq } from './faq.interface';
import {
  createFaqService,
  deleteFaqService,
  getAllFaqsService,
  getSingleFaqService,
  updateFaqService,
} from './faq.services';

export const createFaq = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const faq = await createFaqService(req.body);

    sendResponse<IFaq>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Faq created successfully',
      success: true,
      data: faq,
    });
  },
);

export const getAllFaqs = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const faqs = await getAllFaqsService();

    sendResponse<IFaq>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Faqs retrieved successfully',
      success: true,
      data: faqs,
    });
  },
);

export const getSingleFaq = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const faq = await getSingleFaqService(id);

    sendResponse<IFaq>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Faq retrieved successfully',
      success: true,
      data: faq,
    });
  },
);

export const updateFaq = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFaq = await updateFaqService(id, req.body);

    sendResponse<IFaq>(res, {
      statusCode: StatusCodes.OK,
      message: 'Faq updated successfully',
      success: true,
      data: updatedFaq,
    });
  },
);

export const deleteFaq = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFaq = await deleteFaqService(id);

    sendResponse<IFaq>(res, {
      statusCode: StatusCodes.OK,
      message: 'Faq deleted successfully',
      success: true,
      data: deletedFaq,
    });
  },
);
