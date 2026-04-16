import { includes } from "zod";
import { prisma } from "../../config/prisma.js";

// Crear iglesia
export const create = async (name, districtId) => {
  return prisma.church.create({
    data: { name, districtId },
  });
};

// Ver todas las iglesias
export const getChurchs = async ({ search }) => {
  const where = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  return prisma.church.findMany({
    where,
    orderBy: {
      name: "asc",
    },
    include: {
      district: true,
    },
  });
};

// Ver iglesia por Id
export const getChurchById = (id) => {
  return prisma.church.findUnique({
    where: { id },
    include: {
      district: true,
    },
  });
};

// Actualizar iglesia
export const updateChurch = async (id, data) => {
  return prisma.church.update({
    where: { id },
    data,
  });
};

// Eliminar una iglesia
export const deleteChurch = (id) => {
  return prisma.church.delete({
    where: { id },
  });
};
