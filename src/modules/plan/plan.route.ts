import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  deletePlan,
  getAllPlans,
  getSinglePlan,
  updatePlan,
} from './plan.controller';

export const planRouter = express.Router();

planRouter
  .route('/:id')
  .get(auth(['admin']), getSinglePlan)
  .patch(auth(['admin']), updatePlan)
  .delete(auth(['admin']), deletePlan);

planRouter.route('/').get(auth(['admin']), getAllPlans);
