import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createFeedback, getAllFeedbacks } from './feedback.controller';
import { createFeedbackSchema } from './feedback.validation';

export const feedbackRouter = express.Router();

feedbackRouter
  .route('/')
  .get(auth(['admin']), getAllFeedbacks)
  .post(auth(['admin']), validateRequest(createFeedbackSchema), createFeedback);
