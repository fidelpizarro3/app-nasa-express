import prisma from "../prisma/prismaClient.js";

export const findByEmail = (email) => {
    return prisma.user.findUnique({ where: { email } });
};

export const findById = (id) => {
    return prisma.user.findUnique({ where: { id } });
};

export const create = (data) => {
    return prisma.user.create({ data });
};