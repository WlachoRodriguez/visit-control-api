import * as churchService from "./church.service.js";

// POST /church
export const create = async (req, res, next) => {
  try {
    const { name, districtId } = req.body;
    const church = await churchService.create(name, districtId);
    res.json(church);
  } catch (e) {
    next(e);
  }
};

// GET /church
export const getChurchs = async (req, res, next) => {
  try {
    const { search } = req.validated.query;

    const churchs = await churchService.getChurchs({
      search,
    });
    res.json(churchs);
  } catch (e) {
    next(e);
  }
};

// GET /church/:id
export const getChurchById = async (req, res) => {
  const church = await churchService.getChurchById(req.params.id);

  if (!church) {
    return res.status(404).json({ message: "Iglesia no encontrada" });
  }

  res.json(church);
};

// PUT /church/:id
export const updateChurch = async (req, res, next) => {
  try {
    const church = await churchService.updateChurch(req.params.id, req.body);
    res.json(church);
  } catch (e) {
    next(e);
  }
};

// DELETE /church/:id
export const deleteChurch = async (req, res, next) => {
  try {
    await churchService.deleteChurch(req.params.id);
    res.json({ message: "Iglesia eliminada" });
  } catch (e) {
    next(e);
  }
};
