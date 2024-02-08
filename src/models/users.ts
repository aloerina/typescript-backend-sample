import { prisma } from './prisma';
import type { Prisma } from '@prisma/client';

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const createUser = async (createUserInput: Prisma.UsersCreateInput) => {
  return await prisma.users.create({ data: createUserInput });
};

export const getUser = async (id: string) => {
  return await prisma.users.findFirst({
    where: { id: id },
  });
};

export const updateUser = async (
  id: string,
  updateUserInput: Prisma.UsersUpdateInput,
) => {
  return await prisma.users.update({
    where: { id: id },
    data: updateUserInput,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.users.delete({
    where: { id: id },
  });
};
