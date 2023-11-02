import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { PlanFilterOptions } from '../../types/FilterOptions';
import { PaginationOptions } from '../../types/PaginationOption';
import { pickOptions } from '../../utils/pickOptions';
import { sendResponse } from '../../utils/sendResponse';
import { IPlan, IReview } from './plan.interface';
import {
  createPlanService,
  createReviewService,
  deletePlanService,
  getAllPlansService,
  getAllReviewsService,
  getSinglePlanService,
  updatePlanService,
} from './plan.services';

export const createPlan = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const plan = await createPlanService(req.body);

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Plan created successfully',
      success: true,
      data: plan,
    });
  },
);

export const createReview = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = req.body;
    const userId = req.jwtPayload?.id;

    const createdReview = await createReviewService(id, review, userId);

    sendResponse<IReview>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Review created successfully',
      success: true,
      data: createdReview,
    });
  },
);

export const getAllReviews = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const reviews = await getAllReviewsService();

    sendResponse<IReview[]>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Reviews retrieved successfully',
      success: true,
      data: reviews,
    });
  },
);

export const getAllPlans = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as Record<string, unknown>,
      ['page', 'size', 'sortOrder', 'sortBy'],
    ) as PaginationOptions;

    const filters = pickOptions(req.query as Record<string, unknown>, [
      'minPrice',
      'maxPrice',
      'title',
      'search',
    ]) as PlanFilterOptions;

    const result = await getAllPlansService(paginationOptions, filters);

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Plans retrieved successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  },
);

export const getSinglePlan = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const plan = await getSinglePlanService(id);

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Plan retrieved successfully',
      success: true,
      data: plan,
    });
  },
);

export const updatePlan = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPlan = await updatePlanService(id, req.body);

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.OK,
      message: 'Plan updated successfully',
      success: true,
      data: updatedPlan,
    });
  },
);

export const deletePlan = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedPlan = await deletePlanService(id);

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.OK,
      message: 'Plan deleted successfully',
      success: true,
      data: deletedPlan,
    });
  },
);
