import { prisma } from "../../config/prisma.js";

// Crear visita
export const create = async (
  date,
  schedule,
  type,
  comments,
  userId,
  members,
) => {
  return prisma.visit.create({
    data: {
      date,
      schedule,
      type,
      comments,
      userId,
      members: {
        connect: members.map((id) => ({ id })),
      },
    },
  });
};

// Ver todos los visitas
export const getVisits = async ({ search, date }, userId) => {
  const where = {
    ...userId,
    ...(search && {
      type: {
        contains: search,
        mode: "insensitive",
      },
    }),
    ...(date && { date }),
  };

  return prisma.visit.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      schedule: true,
      type: true,
      comments: true,
      members: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// Ver visita por Id
export const getVisitById = (id, userId) => {
  return prisma.visit.findUnique({
    where: { id, userId },
    select: {
      id: true,
      date: true,
      schedule: true,
      type: true,
      comments: true,
      members: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// Actualizar visita
export const updateVisit = async (id, data) => {
  return prisma.visit.update({
    where: { id },
    data: {
      date: data.date,
      schedule: data.schedule,
      type: data.type,
      comments: data.comments,
      userId: data.userId,
      members: {
        connect: data.members.map((id) => ({ id })),
      },
    },
  });
};

// Eliminar un visita
export const deleteVisit = (id) => {
  return prisma.visit.delete({
    where: { id },
  });
};
