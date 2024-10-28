import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PostTag = {
  add: async (postId: number, tagId: number) => {
    // Check if the post-tag relationship already exists
    const existingPostTag = await prisma.postTag.findUnique({
      where: {
        postId_tagId: {
          postId: postId,
          tagId: tagId,
        },
      },
    });

    if (existingPostTag) {
      return existingPostTag; // If it exists, return it
    }

    // Create a new post-tag relationship if it does not exist
    const newPostTag = await prisma.postTag.create({
      data: {
        postId: postId,
        tagId: tagId,
      },
    });

    return newPostTag;
  },
  delete: async (postId: number, tagId: number) => {
    const existingPostTag = await prisma.postTag.findUnique({
      where: {
        postId_tagId: {
          postId: postId,
          tagId: tagId,
        },
      },
    });

    if (!existingPostTag) {
      console.log("PostTag isn't found:", existingPostTag);
      return { message: "PostTag not found, nothing to delete." };
    }

    const deletedPostTag = await prisma.postTag.delete({
      where: {
        postId_tagId: {
          postId: postId,
          tagId: tagId,
        },
      },
    });

    console.log("PostTag entry deleted:", deletedPostTag);
    return deletedPostTag;
  },
};

export default PostTag;
