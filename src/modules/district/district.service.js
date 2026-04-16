import { prisma } from "../../config/prisma.js";

// Crear distrito
export const create = async (name) => {
  return prisma.district.create({
    data: { name },
  });
};

// Ver todos los distritos
export const getDistricts = async ({ search }) => {
  const where = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  return prisma.district.findMany({
    where,
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });
};

// Ver distrito por Id
export const getDistrictById = (id) => {
  return prisma.district.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
};

// Actualizar distrito
export const updateDistrict = async (id, data) => {
  return prisma.district.update({
    where: { id },
    data,
  });
};

// Eliminar un distrito
export const deleteDistrict = (id) => {
  return prisma.district.delete({
    where: { id },
  });
};
