import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IPlan, IReview } from './plan.interface';
import {
  createPlanService,
  createReviewService,
  deletePlanService,
  getAllPlansService,
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
      data: plan as IPlan,
    });
  },
);

export const createReview = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = req.body;
    const userId = req.jwtPayload?.userId;

    const createdReview = await createReviewService(id, review, userId);

    sendResponse<IReview>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Review created successfully',
      success: true,
      data: createdReview as unknown as IReview,
    });
  },
);

export const getAllPlans = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const plans = await getAllPlansService();

    sendResponse<IPlan>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Plans retrieved successfully',
      success: true,
      data: plans as unknown as IPlan,
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
      data: plan as unknown as IPlan,
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
      data: updatedPlan as unknown as IPlan,
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
      data: deletedPlan as unknown as IPlan,
    });
  },
);
