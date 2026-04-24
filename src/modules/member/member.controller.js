import * as memberService from "./member.service.js";

// POST /member
export const create = async (req, res, next) => {
  try {
    const { name, lastName, phone, address, churchId } = req.body;
    const member = await memberService.create(
      name,
      lastName,
      phone,
      address,
      churchId,
    );
    res.json(member);
  } catch (e) {
    next(e);
  }
};

// GET /member
export const getMembers = async (req, res, next) => {
  try {
    const { search } = req.validated.query;

    const members = await memberService.getMembers({
      search,
    });
    res.json(members);
  } catch (e) {
    next(e);
  }
};

// GET /member/:id
export const getMemberById = async (req, res) => {
  const member = await memberService.getMemberById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: "Iglesia no encontrada" });
  }

  res.json(member);
};

// PUT /member/:id
export const updateMember = async (req, res, next) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);
    res.json(member);
  } catch (e) {
    next(e);
  }
};

// DELETE /member/:id
export const deleteMember = async (req, res, next) => {
  try {
    await memberService.deleteMember(req.params.id);
    res.json({ message: "Miembro eliminado" });
  } catch (e) {
    next(e);
  }
};

export const createMany = async (req, res, next) => {
  try {
    const members = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({ message: "Debe ser un array" });
    }

    const result = await memberService.createMany(members);

    res.json(result);
  } catch (e) {
    next(e);
  }
};
