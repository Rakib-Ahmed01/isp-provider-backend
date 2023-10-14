import { z } from 'zod';

export const createFeedbackSchema = z.object({
  body: z.object({
    subject: z.string({
      required_error: 'Subject is required',
      invalid_type_error: 'Subject must be a string',
    }),
    comment: z.string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment must be a string',
    }),
    userId: z.string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    }),
  }),
});
