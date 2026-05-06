import { Router } from "express";
import * as controller from "./church.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  churchSchema,
  churchQuerySchema,
} from "../../validations/church.schema.js";

const router = Router();

router.post("/", validate(churchSchema), controller.create);
router.get("/", validate(churchQuerySchema, "query"), controller.getChurchs);
router.get("/:id", controller.getChurchById);
router.put("/:id", validate(churchSchema), controller.updateChurch);
router.delete("/:id", controller.deleteChurch);

export default router;
