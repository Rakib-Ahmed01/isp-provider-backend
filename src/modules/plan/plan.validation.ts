import { z } from 'zod';

export const createPlanSchema = z.object({
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
  isAvailable: z.boolean({
    required_error: 'Is Available is required',
    invalid_type_error: 'Is Available must be a boolean',
  }),
  image: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image must be a string',
  }),
});

export const updatePlanSchema = createPlanSchema.deepPartial();
