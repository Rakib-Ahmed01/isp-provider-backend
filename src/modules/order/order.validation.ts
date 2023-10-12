import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    planId: z.string({
      required_error: 'Plan id is required',
      invalid_type_error: 'Plan id must be a string',
    }),
    userId: z.string({
      required_error: 'User id is required',
      invalid_type_error: 'User id must be a string',
    }),
    status: z.enum(['pending', 'completed', 'canceled'], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be a string',
    }),
  }),
});

export const updateOrderSchema = createOrderSchema.deepPartial();
