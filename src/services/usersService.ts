import * as usersModel from '../models/users';
import type { Prisma } from '@prisma/client';
import type {
  CreateUserReqBody,
  UpdateUserReqBody,
} from '../types/aspida/@types';

import * as zod from '../types/zod/generated/index';

export const getUsers = async () => {
  return await usersModel.getUsers();
};

export const createUser = async (user: CreateUserReqBody) => {
  const createUserInput: Prisma.UsersCreateInput =
    zod.UsersCreateInputSchema.parse(user);
  return await usersModel.createUser(createUserInput);
};

export const getUser = async (id: string) => {
  return await usersModel.getUser(id);
};

export const updateUser = async (id: string, user: UpdateUserReqBody) => {
  const updateUserInput: Prisma.UsersUpdateInput =
    zod.UsersUpdateInputSchema.parse(user);
  return await usersModel.updateUser(id, updateUserInput);
};

export const deleteUser = async (id: string) => {
  return await usersModel.deleteUser(id);
};
