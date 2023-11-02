import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }),
    speed: z.number({
      required_error: 'Speed is required',
      invalid_type_error: 'Speed must be a number',
    }),
  }),
});

export const updatePlanSchema = createPlanSchema.deepPartial();

export const createReviewSchema = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment must be a string',
    }),
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5'),
  }),
});
