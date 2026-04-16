import * as districtService from "./district.service.js";

// POST /district
export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const district = await districtService.create(name);
    res.json(district);
  } catch (e) {
    next(e);
  }
};

// GET /districts
export const getDistricts = async (req, res, next) => {
  try {
    const { search } = req.validated.query;

    const districts = await districtService.getDistricts({
      search,
    });
    res.json(districts);
  } catch (e) {
    next(e);
  }
};

// GET /district/:id
export const getDistrictById = async (req, res) => {
  const district = await districtService.getDistrictById(req.params.id);

  if (!district) {
    return res.status(404).json({ message: "Distrito no encontrado" });
  }

  res.json(district);
};

// PUT /district/:id
export const updateDistrict = async (req, res, next) => {
  try {
    const district = await districtService.updateDistrict(
      req.params.id,
      req.body,
    );
    res.json(district);
  } catch (e) {
    next(e);
  }
};

// DELETE /district/:id
export const deleteDistrict = async (req, res, next) => {
  try {
    await districtService.deleteDistrict(req.params.id);
    res.json({ message: "Distrito eliminado" });
  } catch (e) {
    next(e);
  }
};
