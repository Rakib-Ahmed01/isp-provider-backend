import { Prisma } from '@prisma/client';

export type IPlan = Prisma.$PlanPayload['scalars'];
export type IReview = Prisma.$ReviewPayload['scalars'];
