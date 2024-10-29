import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const User = {
  getAll: async () => {
    return await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  },
  findByUserName: async (username: string) => {
    return await prisma.user.findUnique({
      where: { userName: username },
    });
  },
  getById: async (id: number) => {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },
  create: async (user: {
    name: string;
    userName: string;
    hashedPassword: string;
  }) => {
    return await prisma.user.create({
      data: {
        name: user.name,
        userName: user.userName,
        hashedPassword: user.hashedPassword,
      },
    });
  },
  update: async (user: {
    id: number;
    name?: string;
    userName?: string;
    hashedPassword?: string;
  }) => {
    const updateData: {
      name?: string;
      userName?: string;
      hashedPassword?: string;
    } = {};

    if (user.name) updateData.name = user.name;
    if (user.userName) updateData.userName = user.userName;
    if (user.hashedPassword) updateData.hashedPassword = user.hashedPassword;

    return await prisma.user.update({
      where: { id: Number(user.id) },
      data: updateData,
    });
  },
  delete: async (id: number) => {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },
};

export default User;
