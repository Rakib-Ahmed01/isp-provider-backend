import express, { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { orderRouter } from '../modules/order/order.route';
import { planRouter } from '../modules/plan/plan.route';
import { profileRouter } from '../modules/profile/profile.route';
import { userRouter } from '../modules/user/user.route';

export const router = express.Router();

type Route = {
  path: `/${string}`;
  router: Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/profile',
    router: profileRouter,
  },
  {
    path: '/plans',
    router: planRouter,
  },
  {
    path: '/orders',
    router: orderRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));
