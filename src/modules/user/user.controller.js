import * as userService from "./user.service.js";

// GET /users
export const getUsers = async (req, res, next) => {
  try {
    const { page, limit, role, isActive, search } = req.validated.query;

    const users = await userService.getUsers({
      page,
      limit,
      role,
      isActive,
      search,
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
};

// GET /users/:id
export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (e) {
    next(e);
  }
};
