import express from 'express';
import { healthcheck } from './healthcheck.controller';

export const healthcheckRouter = express.Router();

healthcheckRouter.get('/', healthcheck);
