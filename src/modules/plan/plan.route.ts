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
  .get(auth(['admin']), getSinglePlan)
  .patch(auth(['admin']), validateRequest(updatePlanSchema), updatePlan)
  .delete(auth(['admin']), deletePlan);

planRouter
  .route('/')
  .get(auth(['admin']), getAllPlans)
  .post(auth(['admin']), validateRequest(createPlanSchema), createPlan);
