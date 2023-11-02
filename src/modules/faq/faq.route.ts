import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
} from './faq.controller';
import { createFaqSchema, updateFaqSchema } from './faq.validation';

export const faqRouter = express.Router();

faqRouter
  .route('/:id')
  .get(auth(['admin', 'super_admin']), getSingleFaq)
  .patch(
    auth(['admin', 'super_admin']),
    validateRequest(updateFaqSchema),
    updateFaq,
  )
  .delete(auth(['admin', 'super_admin']), deleteFaq);

faqRouter
  .route('/')
  .get(getAllFaqs)
  .post(
    auth(['admin', 'super_admin']),
    validateRequest(createFaqSchema),
    createFaq,
  );
