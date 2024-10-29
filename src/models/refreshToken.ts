import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const RefreshToken = {
  // Create a new refresh token record for a user
  create: async (
    userId: number,
    expiresAt: Date
  ): Promise<ReturnType<typeof prisma.refreshToken.create>> => {
    return await prisma.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
  },

  // Find a refresh token by ID
  findById: async (id: number) => {
    return await prisma.refreshToken.findUnique({
      where: { id },
    });
  },

  findUnique: async (id: number) => {
    return await prisma.refreshToken.findUnique({
      where: { id },
    });
  },

  // Update an existing refresh token (for rotating tokens)
  update: async (id: number, newExpiresAt: Date) => {
    return await prisma.refreshToken.update({
      where: { id },
      data: {
        expiresAt: newExpiresAt,
        updatedAt: new Date(),
      },
    });
  },

  // Revoke a refresh token by setting revokedAt
  revoke: async (id: number) => {
    return await prisma.refreshToken.update({
      where: { id },
      data: {
        revokedAt: new Date(),
      },
    });
  },
};

export default RefreshToken;