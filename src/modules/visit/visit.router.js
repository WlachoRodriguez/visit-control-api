import { Router } from "express";
import * as controller from "./visit.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  visitSchema,
  visitQuerySchema,
} from "../../validations/visit.schema.js";

const router = Router();

// Permiso de USER
router.use(authMiddleware, roleMiddleware("USER"));

router.post("/", validate(visitSchema), controller.create);
router.get("/", validate(visitQuerySchema, "query"), controller.getVisits);
router.get("/:id", controller.getVisitById);
router.put("/:id", validate(visitSchema), controller.updateVisit);
router.delete("/:id", controller.deleteVisit);

export default router;
