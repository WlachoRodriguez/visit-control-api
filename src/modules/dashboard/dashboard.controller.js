import * as dashboardService from "./dashboard.service.js";

export const getDataFromGraphs = async (req, res, next) => {
  try {
    const { startDate, endDate, userId } = req.query;

    const data = await dashboardService.getDataFromGraphs(
      { startDate, endDate, userId },
      req.user,
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
