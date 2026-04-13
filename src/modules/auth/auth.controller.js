import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body.email, req.body.password);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
