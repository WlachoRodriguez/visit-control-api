import { Router } from "express";
import * as controller from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../../validations/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

router.use(authMiddleware);
router.put(
  "/changePassword",
  validate(changePasswordSchema),
  controller.changePassword,
);

export default router;
