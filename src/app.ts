import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import { globalErrorHandler, notFoundHandler } from './middlewares/errors';
import { router } from './routes';
import throwApiError from './utils/throwApiError';

const app: Application = express();

const file = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, __, ___, options) => {
    throwApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`,
    );
  },
});

app.use([
  cors(),
  limiter,
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

// Home Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Book Catalog Server...🐱‍🏍' });
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Book Catalog Server...🐱‍🏍' });
});

app.use('/api/v1', router);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'QuickNet API Documentation',
  }),
);

// error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
