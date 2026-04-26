import { Router } from "express";
import * as controller from "./dashboard.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { dashboardQuerySchema } from "../../validations/dashboard.schema.js";

const router = Router();
router.use(authMiddleware);

router.get(
  "/",
  validate(dashboardQuerySchema, "query"),
  controller.getDataFromGraphs,
);

export default router;
