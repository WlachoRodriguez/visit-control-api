import { prisma } from "../../config/prisma.js";

// Ver todos los usuarios
export const getUsers = async ({ page, limit, role, search }) => {
  const where = {
    ...(role && { role }),

    ...(search && {
      email: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Ver usuario por Id
export const getUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// Actualizar la informacion de un usuario
export const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

// Eliminar un usuario
export const deleteUser = (id) => {
  return prisma.user.delete({
    where: { id },
  });
};
