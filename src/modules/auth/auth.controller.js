import * as authService from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name, lastName, role, isActive } = req.body;
    const user = await authService.register(
      email,
      password,
      name,
      lastName,
      role,
      isActive,
    );
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
