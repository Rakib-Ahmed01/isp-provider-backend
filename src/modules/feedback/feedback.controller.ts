import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { PaginationOptions } from '../../types/PaginationOption';
import { pickOptions } from '../../utils/pickOptions';
import { sendResponse } from '../../utils/sendResponse';
import { IFeedback } from './feedback.interface';
import {
  createFeedbackService,
  getAllFeedbacksService,
} from './feedback.services';

export const createFeedback = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const feedback = await createFeedbackService(req.body);

    const authHeader = req.headers.authorization;

    console.log({ authHeader });

    sendResponse<IFeedback>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Feedback created successfully',
      success: true,
      data: feedback,
    });
  },
);

export const getAllFeedbacks = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as Record<string, unknown>,
      ['page', 'size', 'sortFeedback', 'sortBy'],
    ) as PaginationOptions;

    const result = await getAllFeedbacksService(paginationOptions);

    sendResponse<IFeedback>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Feedbacks retrieved successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  },
);
