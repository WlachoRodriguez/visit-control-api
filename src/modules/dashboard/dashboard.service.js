import { prisma } from "../../config/prisma.js";

export const getDataFromGraphs = async (
  { startDate, endDate, userId },
  reqUser,
) => {
  const isAdmin = reqUser.role === "ADMIN";
  const filterUserId = isAdmin ? userId : reqUser.userId;

  const whereVisits = {
    date: {
      gte: startDate,
      lte: endDate,
    },
    ...(filterUserId && {
      userId: filterUserId,
    }),
  };

  // Visita por usuario (admin)
  let visitsByUser = [];

  if (isAdmin) {
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        _count: {
          select: {
            visits: {
              where: {
                date: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          },
        },
      },
    });

    visitsByUser = users.map((u) => ({
      userId: u.id,
      name: u.name,
      lastName: u.lastName,
      count: u._count.visits,
    }));
  }

  // Visitas por mes
  const visits = await prisma.visit.findMany({
    where: whereVisits,
    select: {
      date: true,
    },
  });

  // -- busqueda de visitas por mes
  const visitsByMonthMap = {};

  visits.forEach((v) => {
    const month = v.date.toISOString().slice(0, 7);

    if (!visitsByMonthMap[month]) {
      visitsByMonthMap[month] = 0;
    }

    visitsByMonthMap[month]++;
  });

  // -- meses dentro del rango de fechas
  const months = [];

  const current = new Date(startDate);
  current.setDate(1);

  const end = new Date(endDate);

  while (current <= end) {
    const month = current.toISOString().slice(0, 7);
    months.push(month);

    current.setMonth(current.getMonth() + 1);
  }

  // -- resultado de visitas por mes
  const visitsByMonth = months.map((month) => ({
    month,
    count: visitsByMonthMap[month] || 0,
  }));

  // Visitas por iglesia
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const churches = await prisma.church.findMany({
    where: {
      districtId: user.districtId,
    },
    select: {
      id: true,
      name: true,
      members: {
        select: {
          visits: {
            where: {
              date: {
                gte: startDate,
                lte: endDate,
              },
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const visitsByChurch = churches.map((church) => {
    const count = church.members.reduce(
      (acc, member) => acc + member.visits.length,
      0,
    );

    return {
      churchName: church.name,
      count,
    };
  });

  return {
    ...(isAdmin && { visitsByUser }),
    visitsByMonth,
    visitsByChurch,
  };
};
