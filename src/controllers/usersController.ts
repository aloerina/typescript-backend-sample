import type { Request, Response } from 'express';
import * as usersService from '../services/usersService';
import { logger } from '../middlewares/logger';
import {
  CreateUserReqBody,
  UpdateUserReqBody,
  UserResponse,
  UserPathParam,
  ErrorResponse,
} from '../types/aspida/@types';

export const getUsers = async (_req: Request, res: Response) => {
  const resBody = await usersService.getUsers();
  return res.json({ users: resBody });
};

export const createUser = async (
  req: Request<unknown, unknown, CreateUserReqBody>,
  res: Response<UserResponse | ErrorResponse>,
) => {
  logger.info(req.body);
  const resBody = await usersService.createUser(req.body);
  return res.json({ user: resBody });
};

export const getUser = async (
  req: Request<UserPathParam>,
  res: Response<UserResponse | ErrorResponse>,
) => {
  const userId = req.params.userId;
  logger.info({ userId: userId });
  const resBody = await usersService.getUser(userId);
  if (!resBody) {
    return res.json(createUserNotFoundResBody(userId)).status(400);
  }
  return res.json({ user: resBody });
};

export const updateUser = async (
  req: Request<UserPathParam, unknown, UpdateUserReqBody, unknown>,
  res: Response<UserResponse | ErrorResponse>,
) => {
  const userId = req.params.userId;
  const resBody = await usersService.updateUser(userId, req.body);

  if (!resBody) {
    return res.json(createUserNotFoundResBody(userId)).status(400);
  }
  return res.json({ user: resBody });
};

export const deleteUser = async (
  req: Request<UserPathParam>,
  res: Response,
) => {
  const userId = req.params.userId;
  const resBody = await usersService.deleteUser(userId);

  if (!resBody) {
    return res.json(createUserNotFoundResBody(userId)).status(400);
  }
  return res.send('No Content').status(204);
};

const createUserNotFoundResBody = (userId: string): ErrorResponse => {
  return {
    errors: [{ message: `User NotFound.(userId: ${userId})` }],
  };
};
