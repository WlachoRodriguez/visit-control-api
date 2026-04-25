import { prisma } from "../../config/prisma.js";

// Crear miembro
export const create = async (name, lastName, phone, address, churchId) => {
  return prisma.member.create({
    data: { name, lastName, phone, address, churchId },
  });
};

// Ver todos los miembros
export const getMembers = async ({ search }, userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.districtId) {
    throw new Error("Usuario sin districtId");
  }

  const where = {
    church: {
      districtId: user.districtId,
    },
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
      lastName: {
        contains: search,
        mode: "insensitive",
      },
      phone: {
        contains: search,
        mode: "insensitive",
      },
      address: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  return prisma.member.findMany({
    where,
    orderBy: {
      name: "asc",
    },
    include: {
      church: true,
    },
  });
};

// Ver miembro por Id
export const getMemberById = async (id, userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.districtId) {
    throw new Error("Usuario sin districtId");
  }

  return prisma.member.findUnique({
    where: { id, church: { districtId: user.districtId } },
    include: {
      church: true,
    },
  });
};

// Actualizar miembro
export const updateMember = async (id, data) => {
  return prisma.member.update({
    where: { id },
    data,
  });
};

// Eliminar un miembro
export const deleteMember = async (id) => {
  const visits = await prisma.visit.count({
    where: {
      members: {
        some: {
          id: id,
        },
      },
    },
  });

  if (visits > 0) {
    throw new Error(
      "No puedes eliminar este miembro porque tiene visitas asociadas",
    );
  }

  return prisma.member.delete({
    where: { id },
  });
};

export const createMany = async (members) => {
  const validMembers = members.filter(
    (m) => m.name && m.lastName && m.phone && m.address && m.churchId,
  );

  const result = await prisma.member.createMany({
    data: validMembers,
    skipDuplicates: true,
  });

  return {
    total: members.length,
    inserted: result.count,
    ignored: members.length - result.count,
  };
};
