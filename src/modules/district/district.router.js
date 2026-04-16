import { Router } from "express";
import * as controller from "./district.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  districtSchema,
  districtQuerySchema,
} from "../../validations/district.schema.js";

const router = Router();

// Permiso de ADMIN
router.use(authMiddleware, roleMiddleware("ADMIN"));

router.post("/", validate(districtSchema), controller.create);
router.get(
  "/",
  validate(districtQuerySchema, "query"),
  controller.getDistricts,
);
router.get("/:id", controller.getDistrictById);
router.put("/:id", validate(districtSchema), controller.updateDistrict);
router.delete("/:id", controller.deleteDistrict);

export default router;
