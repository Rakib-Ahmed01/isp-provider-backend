import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createPlan,
  createReview,
  deletePlan,
  getAllPlans,
  getSinglePlan,
  updatePlan,
} from './plan.controller';
import {
  createPlanSchema,
  createReviewSchema,
  updatePlanSchema,
} from './plan.validation';

export const planRouter = express.Router();

planRouter.post(
  '/:id/reviews',
  auth(['admin', 'user', 'super_admin']),
  validateRequest(createReviewSchema),
  createReview,
);

planRouter
  .route('/:id')
  .get(getSinglePlan)
  .patch(validateRequest(updatePlanSchema), updatePlan)
  .delete(deletePlan);

planRouter
  .route('/')
  .get(getAllPlans)
  .post(validateRequest(createPlanSchema), createPlan);
