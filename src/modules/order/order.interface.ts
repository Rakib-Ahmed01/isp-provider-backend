import { Prisma } from '@prisma/client';

export type IOrder = Prisma.$OrderPayload['scalars'];
