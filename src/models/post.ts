import { PrismaClient } from "@prisma/client";
import { SHOW_DELETED, POST_STATUS } from "../const.js";

const prisma = new PrismaClient();

const Post = {
  getAll: async (query_string: {
    status?: string;
    showDeleted?: string;
    category?: string;
    tags?: string;
  }) => {
    const { category, status, showDeleted, tags } = query_string;
    let query_conditions: any = {};

    // Existing conditions for deleted and category filtering
    if (showDeleted === SHOW_DELETED.FALSE) {
      query_conditions.deletedAt = null;
    } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
      query_conditions.deletedAt = { not: null };
    } else if (showDeleted !== SHOW_DELETED.TRUE) {
      query_conditions.deletedAt = null;
    }

    if (category) {
      query_conditions.category_id = Number(category);
    }

    if (status === POST_STATUS.PUBLISHED) {
      query_conditions.publishedAt = { not: null };
    } else if (status === POST_STATUS.DRAFT) {
      query_conditions.publishedAt = null;
      query_conditions.deletedAt = null;
    }

    // Tags handling
    if (tags) {
      const tagIds = tags.split(",").map(Number);
      if (tagIds.length > 0 && !tagIds.includes(NaN)) {
        query_conditions.postTag = {
          some: {
            tagId: {
              in: tagIds,
            },
          },
        };
      }
    }

    // Return response
    return await prisma.post.findMany({
      where: query_conditions,
    });
  },

  create: async (categoryId: number, title: string, content: string) => {
    return await prisma.post.create({
      data: {
        categoryId,
        title,
        content,
      },
    });
  },

  getById: async (id: number) => {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
    });
  },

  update: async (
    id: number,
    categoryId?: number,
    title?: string,
    content?: string,
    publishedAt?: Date | null
  ) => {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: {
        categoryId,
        title,
        content,
        publishedAt,
      },
    });
  },

  delete: async (id: number) => {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },
};

export default Post;
