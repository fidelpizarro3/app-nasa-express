import prisma from "../prisma/prismaClient.js";

export const getByUser = async (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: { apod: true },
  });
};

export const exists = async (userId, apodId) => {
  return prisma.favorite.findUnique({
    where: { userId_apodId: { userId, apodId } },
  });
};

export const add = async (userId, apodId) => {
  return prisma.favorite.create({
    data: { userId, apodId },
  });
};

export const remove = async (userId, apodId) => {
  const existing = await prisma.favorite.findUnique({
    where: { userId_apodId: { userId, apodId } },
  });
  if (!existing) return null;

  return prisma.favorite.delete({
    where: { userId_apodId: { userId, apodId } },
  });
};
