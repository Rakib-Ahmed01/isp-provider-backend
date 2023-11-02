import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createPlan,
  createReview,
  deletePlan,
  getAllPlans,
  getAllReviews,
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

planRouter.get('/reviews', getAllReviews);

planRouter
  .route('/:id')
  .get(getSinglePlan)
  .patch(
    auth(['admin', 'super_admin']),
    validateRequest(updatePlanSchema),
    updatePlan,
  )
  .delete(auth(['admin', 'super_admin']), deletePlan);

planRouter
  .route('/')
  .get(getAllPlans)
  .post(
    auth(['admin', 'super_admin']),
    validateRequest(createPlanSchema),
    createPlan,
  );
