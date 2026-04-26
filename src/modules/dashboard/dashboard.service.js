import { prisma } from "../../config/prisma.js";

export const getDataFromGraphs = async (
  { startDate, endDate, userId },
  reqUser,
) => {
  const isAdmin = reqUser.role === "ADMIN";
  console.log("userId", userId);

  const filterUserId = isAdmin ? userId : reqUser.id;
  console.log("filterUserId", filterUserId);

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
    const data = await prisma.visit.groupBy({
      by: ["userId"],
      _count: {
        _all: true,
      },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    visitsByUser = data.map((d) => ({
      userId: d.userId,
      count: d._count._all,
    }));
  }

  // Visitas por mes
  const visits = await prisma.visit.findMany({
    where: whereVisits,
    select: {
      date: true,
    },
  });

  const visitsByMonthMap = {};

  visits.forEach((v) => {
    const month = v.date.toISOString().slice(0, 7); // YYYY-MM

    if (!visitsByMonthMap[month]) {
      visitsByMonthMap[month] = 0;
    }

    visitsByMonthMap[month]++;
  });

  const visitsByMonth = Object.entries(visitsByMonthMap).map(
    ([month, count]) => ({
      month,
      count,
    }),
  );

  // Visitas por iglesia
  const visitsWithMembers = await prisma.visit.findMany({
    where: whereVisits,
    include: {
      members: {
        include: {
          church: true,
        },
      },
    },
  });

  const churchMap = {};

  visitsWithMembers.forEach((visit) => {
    visit.members.forEach((member) => {
      const churchName = member.church.name;

      if (!churchMap[churchName]) {
        churchMap[churchName] = 0;
      }

      churchMap[churchName]++;
    });
  });

  const visitsByChurch = Object.entries(churchMap).map(
    ([churchName, count]) => ({
      churchName,
      count,
    }),
  );

  return {
    ...(isAdmin && { visitsByUser }),
    visitsByMonth,
    visitsByChurch,
  };
};
