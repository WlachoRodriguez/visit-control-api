import { Router } from "express";
import * as controller from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  updateUserSchema,
  userQuerySchema,
} from "../../validations/user.schema.js";

const router = Router();

// Permiso de ADMIN
router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/", validate(userQuerySchema, "query"), controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", validate(updateUserSchema), controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
