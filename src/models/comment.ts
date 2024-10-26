import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Comment = {
  create: async (comment: {
    post_id: number;
    commenter_name: string;
    content: string;
  }) => {
    return await prisma.comment.create({
      data: {
        post: { connect: { id: comment.post_id } },
        commenterName: comment.commenter_name,
        content: comment.content,
      },
    });
  },

  getAll: async (query_string: { post?: number; commenter?: string }) => {
    const { post, commenter } = query_string;
    return await prisma.comment.findMany({
      where: {
        ...(post ? { postId: post } : {}),
        ...(commenter ? { commenterName: commenter } : {}),
      },
    });
  },

  getById: async (id: number) => {
    return await prisma.comment.findUnique({
      where: { id },
    });
  },

  update: async (id: number, comment: { content?: string }) => {
    return await prisma.comment.update({
      where: { id },
      data: comment,
    });
  },

  delete: async (id: number) => {
    return await prisma.comment.delete({
      where: { id },
    });
  },
};

export default Comment;
