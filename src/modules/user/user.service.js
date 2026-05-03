import { prisma } from "../../config/prisma.js";

// Ver todos los usuarios
export const getUsers = async ({ page, limit, role, isActive, search }) => {
  const where = {
    ...(role && { role }),
    ...(isActive !== undefined && { isActive }),
    ...(search && {
      OR: [
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
    email: {
      notIn: ["admin@gmail.com"],
    },
  };
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        lastName: true,
        isActive: true,
        districtId: true,
        district: true,
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
      name: true,
      lastName: true,
      isActive: true,
      districtId: true,
      district: true,
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
export const deleteUser = async (id) => {
  const visits = await prisma.visit.count({
    where: { userId: id },
  });

  if (visits > 0) {
    throw new Error("No se puede eliminar un usuario con visitas asociadas");
  }

  return prisma.user.delete({
    where: { id },
  });
};
