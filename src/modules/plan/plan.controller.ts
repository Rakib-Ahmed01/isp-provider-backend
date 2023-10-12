import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IPlan } from './plan.interface';
import {
  deletePlanService,
  getAllPlansService,
  getSinglePlanService,
  updatePlanService,
} from './plan.services';

export const getAllPlans = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const plans = await getAllPlansService();

    sendResponse<Omit<IPlan, 'password'>>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Plans retrieved successfully',
      success: true,
      data: plans,
    });
  },
);

export const getSinglePlan = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const plan = await getSinglePlanService(id);

    sendResponse<Omit<IPlan, 'password'>>(res, {
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

    sendResponse<Omit<IPlan, 'password'>>(res, {
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

    sendResponse<Omit<IPlan, 'password'>>(res, {
      statusCode: StatusCodes.OK,
      message: 'Plan deleted successfully',
      success: true,
      data: deletedPlan,
    });
  },
);
