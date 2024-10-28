import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Tag = {
  getAll: async () => {
    return await prisma.tag.findMany();
  },
  create: async (name: string) => {
    console.log("Name:", name);

    return await prisma.tag.create({
      data: {
        name: name,
      },
    });
  },

  getById: async (id: number) => {
    return await prisma.tag.findUnique({
      where: { id: Number(id) },
    });
  },
  update: async (id: number, name: string) => {
    return await prisma.tag.update({
      where: { id: Number(id) },
      data: name,
    });
  },
  delete: async (id: number) => {
    return await prisma.tag.delete({
      where: { id },
    });
  },
};

export default Tag;
