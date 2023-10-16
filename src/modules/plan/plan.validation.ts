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

export const plans = [
  {
    title: 'Starter Plan',
    description:
      "Our Starter Plan is designed for casual internet users who need a reliable and affordable connection. With moderate speeds, it's perfect for browsing, email, and occasional streaming.",
    price: 500,
    speed: 5,
    isAvailable: true,
  },
  {
    title: 'Youth Plan',
    description:
      'The Youth Plan is tailored for young adults and students who require faster internet speeds for online classes, gaming, and entertainment.',
    price: 800,
    speed: 10,
    isAvailable: true,
  },
  {
    title: 'Surfer Plan',
    description:
      'Get ready to surf the web with lightning-fast speeds. The Surfer Plan is ideal for individuals who demand high-speed internet for video streaming, online gaming, and work from home.',
    price: 1000,
    speed: 15,
    isAvailable: true,
  },
  {
    title: 'Freelancing Plan',
    description:
      'The Freelancing Plan is designed for businesses and freelancers with demanding online needs. It offers high-speed internet, low latency, and priority support, making it ideal for hosting video conferences, handling customer interactions, and supporting remote work.',
    price: 1400,
    speed: 25,
    isAvailable: true,
  },
  {
    title: 'Premium Plan',
    description:
      'Experience premium internet performance with faster speeds and low latency. Perfect for power users who need reliability and high-quality streaming.',
    price: 1600,
    speed: 30,
    isAvailable: true,
  },
  {
    title: 'Pro Plan',
    description:
      'The Pro Plan is designed for professionals and remote workers who require fast and dependable internet for video conferences, file sharing, and productivity.',
    price: 1800,
    speed: 35,
    isAvailable: true,
  },
  {
    title: 'Special Plan',
    description:
      'The Special Plan is a unique offering with personalized features tailored to your specific needs. Get a bit of everything—speed, reliability, and flexibility.',
    price: 4000,
    speed: 100,
    isAvailable: true,
  },
];
