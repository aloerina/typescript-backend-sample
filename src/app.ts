import express from 'express';
import { appCors } from './middlewares/cors';
import * as healthController from './controllers/healthController';
import * as usersController from './controllers/usersController';
import pinoHttp from 'pino-http';
import { logger } from './middlewares/logger';
import wrapper from '@myrotvorets/express-async-middleware-wrapper';
import * as OpenApiValidator from 'express-openapi-validator';
import {
  eovErrorHandler,
  unexpectedErrorHandler,
  zodErrorHandler,
} from './middlewares/errorHandler';

export const app = express();

app.use(pinoHttp({ logger }));
app.use(appCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi/openapi.yaml',
    validateRequests: {
      removeAdditional: 'failing',
    },
  }),
);

app.get('/health', healthController.getHealth);
app.get('/users', wrapper(usersController.getUsers));
app.post('/users', wrapper(usersController.createUser));
app.get('/users/:userId', wrapper(usersController.getUser));
app.patch('/users/:userId', wrapper(usersController.updateUser));
app.delete('/users/:userId', wrapper(usersController.deleteUser));

app.use(eovErrorHandler);
app.use(zodErrorHandler);
app.use(unexpectedErrorHandler);
