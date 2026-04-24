import * as visitService from "./visit.service.js";

// POST /visit
export const create = async (req, res, next) => {
  try {
    const { date, schedule, type, comments, userId, members } = req.body;
    const visit = await visitService.create(
      date,
      schedule,
      type,
      comments,
      userId,
      members,
    );
    res.json(visit);
  } catch (e) {
    next(e);
  }
};

// GET /visit
export const getVisits = async (req, res, next) => {
  try {
    const { search, date } = req.validated.query;

    const visits = await visitService.getVisits(
      {
        search,
        date,
      },
      req.user.id,
    );
    res.json(visits);
  } catch (e) {
    next(e);
  }
};

// GET /visit/:id
export const getVisitById = async (req, res) => {
  const visit = await visitService.getVisitById(req.params.id, req.user.id);

  if (!visit) {
    return res.status(404).json({ message: "Visita no encontrada" });
  }

  res.json(visit);
};

// PUT /visit/:id
export const updateVisit = async (req, res, next) => {
  try {
    const visit = await visitService.updateVisit(req.params.id, req.body);
    res.json(visit);
  } catch (e) {
    next(e);
  }
};

// DELETE /visit/:id
export const deleteVisit = async (req, res, next) => {
  try {
    await visitService.deleteVisit(req.params.id);
    res.json({ message: "Visita eliminada" });
  } catch (e) {
    next(e);
  }
};
