import prisma from "../prisma/prismaClient.js";

/**
 * Obtiene un listado paginado y opcionalmente filtrado por título de los registros de APOD.
 * @param {number|string} page - Página actual (por defecto 1)
 * @param {number|string} limit - Cantidad de registros por página (por defecto 10)
 * @param {string} [title] - Filtro de búsqueda por título
 */
export const getAll = async (page = 1, limit = 10, title) => {
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  const where = {};
  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  const [data, total] = await Promise.all([
    prisma.apod.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { date: "desc" },
    }),
    prisma.apod.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

/**
 * Obtiene un registro APOD por su ID único.
 * @param {number|string} id - ID del registro
 */
export const getById = async (id) => {
  return prisma.apod.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
};

/**
 * Crea un nuevo registro APOD.
 * @param {Object} data - Datos del APOD
 */
export const create = async (data) => {
  return prisma.apod.create({
    data,
  });
};

/**
 * Actualiza un registro APOD existente.
 * @param {number|string} id - ID del registro a actualizar
 * @param {Object} data - Datos actualizados del APOD
 */
export const update = async (id, data) => {
  return prisma.apod.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
};

export const remove = async (id) => {
  return prisma.apod.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
};
