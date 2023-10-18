import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(3, 'Title must be at least 3 characters long'),
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .min(10, 'Content must be at least 10 characters long'),
  }),
});

export const updateBlogSchema = createBlogSchema.deepPartial();
