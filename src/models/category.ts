import { PrismaClient } from "@prisma/client";
import { SHOW_DELETED } from "../const";

const prisma = new PrismaClient();

interface categoryQuery {
  id?: number;
  showDeleted?: string;
}

const Category = {
  getAll: async (query: categoryQuery) => {
    const { showDeleted } = query;
    if (showDeleted === SHOW_DELETED.TRUE) {
      return await prisma.category.findMany();
    } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
      return await prisma.category.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
      });
    } else {
      return await prisma.category.findMany({
        where: {
          deletedAt: null,
        },
      });
    }
  },

  getById: async (id: number) => {
    return await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
  },

  create: async (name: string) => {
    return await prisma.category.create({
      data: { name },
    });
  },

  update: async (id: number, udpated_name: string) => {
    return await prisma.category.update({
      where: { id: Number(id) },
      data: { name: udpated_name },
    });
  },

  delete: async (id: number) => {
    return await prisma.category.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },
};

export default Category;
